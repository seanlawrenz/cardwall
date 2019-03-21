import {
  Component,
  OnInit,
  forwardRef,
  Input,
  TemplateRef,
  HostBinding,
  EventEmitter,
  Inject,
  ElementRef,
  Renderer2,
  Output,
  OnChanges,
  SimpleChanges,
  AfterViewInit,
  OnDestroy,
  ChangeDetectionStrategy,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { TypeaheadSuggestions, TypeaheadSettings } from './muilt-select.interface';

import { Subscription, Observable } from 'rxjs';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/mergeAll';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/publishReplay';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/toArray';

import { trim, replace } from 'lodash';
import { sanitizeString } from '@app/utils';

const KEY_UP = 'keyup';
const KEY_DOWN = 'keydown';
const ESCAPE = 'Escape';
const ENTER = 'Enter';
const BACKSPACE = 'Backspace';

@Component({
  selector: 'td-muilt-select',
  templateUrl: './muilt-select.component.html',
  styleUrls: ['./muilt-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => MuiltSelectComponent), multi: true }],
})
export class MuiltSelectComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy, ControlValueAccessor {
  /** suggestions list - array of strings, objects or Observable */
  @Input() data: TypeaheadSuggestions = [];
  /** Template for the items in the dropdown menu */
  @Input() dropDownMenuTemplate: TemplateRef<any>;
  /** Template for the items in the input menu */
  @Input() selectedTemplate: TemplateRef<any>;
  /** Template for no matches */
  @Input() noMatchesTemplate: TemplateRef<any>;
  /** Template for create on no matches. This template is shared with createValue */
  @Input() createOnNoMatchesTemplate: TemplateRef<any>;
  /** Removes the X on the input template */
  @Input() clearButton = true;
  /** field to use from objects as name */
  @Input() nameField = 'name';
  /** Specifies the type of selected value.
   * If true the return object will be a part of value and not the whole object */
  @Input() valuePrimitive = false;
  /** field to use from objects as id */
  @Input() idField = 'id';
  /** Text on the Label for the input. This is for accessibility only */
  @Input() inputLabel = 'Search';
  /** allow custom values */
  @Input() custom = true;
  /** allow multiple values */
  @Input() multi = true;
  /** use Objects for the suggestions and results */
  @Input() complex = false;
  /** Placeholder */
  @Input() placeholder = '';
  /** Allows data if it is matched through a server side call */
  @Input() serverSideData = false;
  /** Allows to add value to matches if there are no matches */
  @Input() createOnNoMatches = false;
  /** Allows a value to be created even if there are matches */
  @Input() createValue = false;
  /** Value of form control */
  @Input()
  set settings(value: Partial<TypeaheadSettings>) {
    Object.assign(this._settings, value);
  }

  get settings(): Partial<TypeaheadSettings> {
    return this._settings;
  }

  /** UI Binding */
  @HostBinding('class.multi')
  get multiBinding() {
    return this.multi;
  }
  @HostBinding('attr.disabled')
  get disabledBinding() {
    return this.isDisabled || null;
  }

  /** Output value change */
  @Output() valueChange: EventEmitter<any> = new EventEmitter();
  /** Output for typeahead string */
  @Output() onQuery: EventEmitter<string> = new EventEmitter();
  /** Output that focus has been lost on the input */
  @Output() onFocusLost: EventEmitter<void> = new EventEmitter();

  // Inital UI state
  isLoading = false;
  isDisabled = false;
  isExpanded = false;
  dropDownClass = '';
  matches: string[] | Object[] = [];
  allMatches: string[] | Object[]; // undefined as it's important to know when the data arrives

  // Values Used for hold the selected values
  values: any[] = [];

  // If the typeahead is an empty search. Init will be empty
  emptySearch = true;

  private allMatchesSubscription: Subscription;
  private matchesSubscription: Subscription;
  private callbackQueue: Array<() => void> = [];

  /**
   * Default values for TypeaheadSettings
   * @type TypeaheadSettings
   * @private
   */
  private _settings: TypeaheadSettings = {
    suggestionsLimit: 50,
    typeDelay: 50,
    noMatchesText: 'No matches found',
    createOnNoMatchesText: 'Will be created',

    buttonClass: 'tdNg-button',
    tagClass: 'tdNg-badge',
    tagRemoveIconClass: '',
    dropDownMenuClass: 'dropdown-menu',
    dropDownMenuExpandedClass: 'dropdown-menu show',
    dropDownMenuItemClass: 'dropdown-item',
    dropDownToggleClass: 'dropdown-toggle',
    dashCase: false,
  };

  private _input: HTMLInputElement;
  private _inputChangeEvent: EventEmitter<any> = new EventEmitter();
  private _value: any;
  private _removeInProgress = false;
  private _blur = false;
  private _createOnNoMatches: boolean;

  constructor(@Inject(ElementRef) private element: ElementRef, @Inject(Renderer2) private renderer: Renderer2) {}

  /**
   * Angular function
   * Sets a subscription for the data. Reran as data comes in from the server
   * @param openDropDown {boolean} Sets the state of the dropdown menu. True = open False = closed
   */
  ngOnInit(openDropDown?: boolean): void {
    this.dataInit(
      this.data instanceof Observable
        ? (<Observable<any>>this.data)
            .publishReplay(1)
            .refCount()
            .mergeAll()
        : Observable.of(...this.data),
    );

    openDropDown ? this.toggleDropdown(openDropDown) : this.toggleDropdown(false);

    this._inputChangeEvent.emit('');
    this._createOnNoMatches = this.createOnNoMatches;
  }

  /**
   * Angular function
   * Reinitialize the component as data is changed from the server
   * @param changes {SimpleChanges} trigger for changes within Angular
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data && !changes.data.firstChange) {
      // Unsubscribe the matches
      this.allMatchesSubscription.unsubscribe();
      this.matchesSubscription.unsubscribe();
      // Reinitialize this.data
      // Not exactly DRY but whatever
      this.dataInit(
        this.data instanceof Observable
          ? (<Observable<any>>this.data)
              .publishReplay(1)
              .refCount()
              .mergeAll()
          : Observable.of(...this.data),
      );

      this._inputChangeEvent.emit('');
    }
  }

  /**
   * Angular function
   * Sets the value of the input to the parents ngModel
   */
  ngAfterViewInit(): void {
    // Set value to input
    this._input = this.element.nativeElement.querySelector('input');

    if (!this.multi && this._value) {
      const callback = () => {
        this._input.value = this.complex ? this.extractNameById(this._value) : this._value;
      };

      if (this.allMatches || !this.complex) {
        callback.apply(this);
      } else {
        this.callbackQueue.push(callback);
      }
    }

    this.toggleDropdown(false);
  }

  ngOnDestroy(): void {
    this.allMatchesSubscription.unsubscribe();
    this.matchesSubscription.unsubscribe();
  }

  get value(): any {
    return this._value;
  }

  set value(value: any) {
    if (value === this._value) {
      return;
    }

    this.writeValue(value);
    this.onChange(value);

    this.valueChange.emit(value);
  }

  /**
   * Controls the closing of the dropdown menu. Fired on (blur) of the input
   */
  onBlur(): void {
    if (this.isDisabled) {
      return;
    }

    if (this._blur) {
      // Just leaving the input box moving to the dropdown menu no need to change anything
      return;
    } else {
      // User has left the box. We're closing
      // Let's tell the world
      this.onFocusLost.emit();
      this.toggleDropdown(false);
    }

    // Keep just approved tags
    if (this.multi) {
      this._input.value = null;
      this._inputChangeEvent.emit('');
      return;
    }

    // Trim Values
    if (!this.custom || this.custom) {
      this._input.value = this._input.value.trim();

      // If not then cleanup the values
      if (!this.hasMatch(this._input.value)) {
        this._input.value = this.value = null;
        this._inputChangeEvent.emit('');
      }
    }
  }

  /**
   * Controls the closing of the dropdown menu. Fired on (blur) of the dropdown menu buttons
   * @param event {HTML event} Set to any for browser compatibility
   */
  onButtonBlur(event: any): void {
    let target: HTMLElement;

    if (event.explicitOriginalTarget) {
      target = event.explicitOriginalTarget;
    } else if (event.relatedTarget) {
      target = event.relatedTarget;
    } else {
      // Not an HTML event leave silently
      this._blur = false;
      this.onBlur();
      return;
    }

    const isFocused: boolean = target.classList.contains(this.settings.dropDownMenuItemClass);
    if (!isFocused) {
      this._blur = false;
      this.onBlur();
    }
  }

  onMouseEnterList(): void {
    this._blur = true;
  }

  onMouseLeaveList(): void {
    this._blur = false;
  }

  /**
   * Sets the value of unmatched search
   * If the users' text does not match any of the data and createOnNoMatches is true
   * then the text will be set as a value.
   */
  addNoMatch() {
    // Keep the dropdown open
    this.toggleDropdown(true);
    if (this.createOnNoMatches) {
      // Set the value to what the user was searching for
      this.setValue(this._input.value, true);
    }
  }

  /**
   * Sets the value to the typeahead text, but not any match
   */
  addCustomMatch() {
    // Keep the dropdown open
    this.toggleDropdown(true);
    if (this.createValue) {
      this.setValue(this._input.value, true);
    }
  }

  /**
   * Stops the propagation of event up the DOM tree in case
   * the 'change' event handler is attached to host component.
   * @param {Event} event
   */
  handleInputChange(event: Event): void {
    event.stopPropagation();
  }

  /**
   * Handles keyboard events on the Input.
   * Sets the value if ENTER is pressed
   * @param event {Event | KeyboardEvent}
   */
  handleInput(event: Event | KeyboardEvent) {
    const target = <HTMLInputElement>event.target;
    // Stop submission if this is on a form
    if ([KEY_DOWN, KEY_UP].includes(event.type) && (event as KeyboardEvent).key === ENTER) {
      event.preventDefault();
    }

    // If esc key, close Dropdown
    if ([KEY_DOWN, KEY_UP].includes(event.type) && (event as KeyboardEvent).key === ESCAPE) {
      this._blur = false;
      this.toggleDropdown(false);
      return;
    }

    // Setting up key events name thanks to Edge and IE having non-standard names
    const keyEvnt: KeyboardEvent = <KeyboardEvent>event;
    const keyPressed: string = keyEvnt.key;
    const isDownArrow: boolean = keyPressed === 'Down' || keyPressed === 'ArrowDown';

    const isIgnorableKey: boolean =
      keyEvnt.keyCode === 16 || // Shift
      keyEvnt.keyCode === 20 || // Caps Lock (CRUISE CONTROL FOR AWESOME)
      keyEvnt.keyCode === 35 || // End
      keyEvnt.keyCode === 36 || // Home
      keyEvnt.keyCode === 37 || // Left
      keyEvnt.keyCode === 38 || // Up
      keyEvnt.keyCode === 39 || // Right
      keyEvnt.keyCode === 40; // Down

    // Prevent fast typing from interrupting the loading process
    if (this.isLoading && isIgnorableKey) {
      event.preventDefault();
      return;
    }

    // If arrow down and matches, select first item in the menu
    if (event.type === KEY_DOWN && isDownArrow) {
      const button = this.element.nativeElement.querySelector('button[role="menuitem"]:first-child');
      // Prevents the document from scrolling in Chrome, Firefox, and IE
      event.preventDefault();
      if (this.matches.length > 0 || this.createOnNoMatches) {
        // Since we're going to leave the input onBlur will be called. This keeps the menu open
        this._blur = true;
        button.focus();
        return;
      }
    }

    this.toggleDropdown(true);

    // Enter
    if (this.multi || this.complex) {
      // User has selected the first one in the selection without using the arrow keys
      if (event.type === KEY_UP && keyPressed === ENTER && target.value !== '') {
        // If loading then we need to suppress the enter function so it can get the data
        if (this.isLoading) {
          return;
        }

        // Conditionally disable the enter button is createOnNoMatches was originally set
        // but was suspended for any reason
        if (this._createOnNoMatches && !this.createOnNoMatches) {
          return;
        }

        // If we are creating if no matches
        if (this.matches.length === 0 && this.createOnNoMatches) {
          this.setValue(target.value);
          return;
        }
        const selectedTarget = this.matches[0];
        this.setValue(selectedTarget);
        this.toggleDropdown(false);
      }

      // Backspace
      if ([KEY_DOWN, KEY_UP].includes(event.type) && keyPressed === BACKSPACE) {
        if (target.value === '') {
          // Removing a value
          if (event.type === KEY_DOWN) {
            this._removeInProgress = true;
          } else if (this._removeInProgress) {
            if (this.multi && this.values.length) {
              this._removeInProgress = false;
              // Let's remove it
              this.removeValue(this.values[this.values.length - 1]);
            }
          }
        } else if (this.complex && !this.multi && event.type === KEY_DOWN) {
          // Remove the lone value
          this.value = null;
        }
      }
    } else if (event.type === KEY_UP) {
      // let's close the menu
      if (keyPressed === ENTER && target.value !== '') {
        // Not multi select or object based, so we just want the lone string
        this.setValue(target.value);

        event.preventDefault();
        // enter and value
        this._blur = false;
        this.toggleDropdown(false);
      }
    }

    // Enter is setting the value so it is handled by a different emit
    // We also want to avoid arrow buttons
    if (keyPressed !== ENTER && !isIgnorableKey) {
      // So emit that the submission has change
      this.onQuery.emit(target.value);
    }
    this._inputChangeEvent.emit(target.value);
  }

  /**
   * Move through collection on dropdown
   * @param event {Keyboard or Mouse Event} Logic depends on if this is a key or mouse event
   * @param value {any} the match
   */
  handleButton(event: KeyboardEvent | MouseEvent, value: any) {
    const target = event.target as HTMLButtonElement;

    // If this is a mouse event then we'll assume that this is a selection
    if (event instanceof MouseEvent) {
      this.setValue(value, true);
      this._inputChangeEvent.emit(this._input.value);
      return;
    }

    // Else keyboard event
    if (event.type === KEY_UP) {
      // User is selecting the match
      if (event.key === ENTER) {
        this.setValue(value);
        this._inputChangeEvent.emit(this._input.value);
        this._blur = false;
        this.toggleDropdown(false);
      }
      // User wants to leave
      if (event.key === ESCAPE) {
        this._input.focus();
        this._blur = false;
        this.toggleDropdown(false);
      }
    } else {
      // Navigating the dropdown menu
      // Setting up key events name thanks to Edge and IE
      const keyPressed: string = event.key;
      const isDownArrow: boolean = keyPressed === 'ArrowDown' || keyPressed === 'Down';
      const isUpArrow: boolean = keyPressed === 'ArrowUp' || keyPressed === 'Up';

      // Scroll to parent
      if (isDownArrow && target.nextElementSibling) {
        // arrow down
        (<HTMLElement>target.nextElementSibling).focus();
      }
      if (isUpArrow && target.previousElementSibling) {
        // arrow up
        (<HTMLElement>target.previousElementSibling).focus();
      }
      // Removing for now. Had inconsistent browser compatibility
      // (<HTMLElement>target.parentNode).scrollTop = target.offsetTop;
    }
  }

  /**
   * Set value to list of values or as a single value
   * @param value
   * @param {boolean} collapseMenu
   */
  setValue(value: any, collapseMenu?: boolean) {
    // If there is no match and we do not want to create one
    if ((!this.custom || this.complex) && !this.hasMatch(value)) {
      if (!this.createOnNoMatches) {
        return;
      }
    }

    // Super duper specific case just for tags
    // Hopefully this will come in handy again, but likely will cause issues because we're not checking for types
    if (this.settings.dashCase) {
      value = this.cleanUpText(value);
      if (value === '') {
        return;
      }
    }

    if (this.multi) {
      if (!this.values.includes(value)) {
        this.value = this.values.concat(value).map(this.extractIdentifier.bind(this));
        this._input.value = '';
      }
    } else {
      this.value = this.extractIdentifier(value);
      this._input.value = this.extractName(value);
    }

    if (collapseMenu) {
      this._blur = false;
      this.toggleDropdown(false);
    }
    // Refocus the input
    this._input.focus();
  }

  /**
   * Remove value from list of values or clear out the value
   * @param value
   */
  removeValue(value: any) {
    if (this.isDisabled) {
      return;
    }

    const index = this.values.indexOf(value);

    if (index !== -1) {
      if (index === this.values.length - 1) {
        this.value = this.values.slice(0, -1).map(this.extractIdentifier.bind(this));
      } else {
        this.value = this.values
          .slice(0, index)
          .concat(this.values.slice(index + 1))
          .map(this.extractIdentifier.bind(this));
      }
      this._inputChangeEvent.emit(this._input.value);
      this._input.focus();
    }
  }

  /**
   * Sets the open or close state of the dropdown menu
   * @param value {boolean} Manually set state. True = open
   */
  toggleDropdown(value?: boolean) {
    if (value === undefined) {
      this._input.focus();
      this.isExpanded = !this.isExpanded;
    } else {
      this.isExpanded = value;
    }
    this.dropDownClass = this.isExpanded ? this.settings.dropDownMenuExpandedClass : this.settings.dropDownMenuClass;
  }

  /**
   * ControlValueAccessor function
   * Write new value(s)
   * @param value
   */
  writeValue(value: any): void {
    // Set value
    this._value = value;
    this.element.nativeElement.value = value;

    // Modify values list
    if (this.multi) {
      if (this.complex) {
        const callback = function() {
          this.values = value ? value.map(this.parseObjectById.bind(this)) : [];
          // Make sure not found value doesn't break the UI
          this.values = this.values.filter((val: any) => !!val);
        };

        if (this.allMatches || !value) {
          callback.apply(this);
        } else {
          this.callbackQueue.push(callback);
        }
      } else {
        this.values = value || [];
      }
    }

    // Trigger change
    if ('createEvent' in document) {
      const event = document.createEvent('HTMLEvents');
      event.initEvent('change', false, true);
      this.element.nativeElement.dispatchEvent(event);
    } else {
      // We need to cast since fireEvent is not standard in IE
      this.element.nativeElement.fireEvent('onchange');
    }
  }

  /**
   * Set disabled state of the component
   * @param {boolean} value
   */
  setDisabledState(value: boolean): void {
    this.isDisabled = value;
    this.renderer.setProperty(this.element.nativeElement, 'disabled', value);
  }

  // Control value accessor value changers
  onChange = (_: any) => {};
  onTouched = () => {};

  /**
   * Control value accessor interface
   * @param fn
   */
  registerOnChange(fn: any) {
    this.onChange = fn;
  }
  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  /**
   * Initialize the data to match against the user search text
   * @param  $data {Observable} data to match
   */
  private dataInit($data: Observable<any>) {
    this.isLoading = true;
    this.matchesSubscription = this._inputChangeEvent
      .debounceTime(this.settings.typeDelay)
      .mergeMap((value: string) => {
        const normalizedValue = sanitizeString(value);
        const $filteredData = $data.filter(this.filterSuggestion(normalizedValue));

        return this.settings.suggestionsLimit ? $filteredData.take(this.settings.suggestionsLimit).toArray() : $filteredData.toArray();
      })
      .subscribe((matches: string[] | Object[]) => {
        this.matches = matches;
        // Filtering the values and matches
        this.valueFilter();
        this.isLoading = false;
      });

    this.allMatchesSubscription = $data.toArray().subscribe((data: string[] | Object[]) => {
      this.allMatches = data;
      while (this.callbackQueue.length) {
        // take first one and process it
        this.callbackQueue.shift().apply(this);
        this._inputChangeEvent.emit('');
      }
    });
  }

  /**
   * Allows user to create a value that partially matches one of the arrays but not exactly.
   * Example match 'td' with 'td-is-cool'
   * Also removes the create value if no match and there are no matches but the value is already selected
   * Example 'this is unique' will not trigger createOnNoMatches if 'this is unique' is already selected
   * @prop emptySearch sets the hide/show of create value view.
   * emptySearch === true will hide the view
   */
  private valueFilter() {
    // Make sure that create value is set
    if (this.createValue === false) {
      return;
    }

    // Set the string to be matched by
    let value: string = this._input.value;
    // Clean up text if necessary
    if (this.settings.dashCase) {
      value = this.cleanUpText(value);
    }

    // Match the value against an already created value if multi
    let alreadyCreated = false;
    if (this.multi) {
      alreadyCreated = this.values.includes(value);

      // Is createOnNoMatches set and there are no matches
      if (this._createOnNoMatches && this.matches.length === 0) {
        // Do not allow createOnNoMatches if the search value is already selected
        this.createOnNoMatches = !alreadyCreated;
      } else {
        // Reset to original
        this.createOnNoMatches = this._createOnNoMatches;
      }
    }

    // Only allow create value if the value is not blank
    // or match a value either in the list of values selected or matches
    this.emptySearch = value === '' || value === null || this.hasMatch(value) || alreadyCreated === true;
  }

  /**
   * @param {string} filter
   * @returns {(value: any) => boolean}
   */
  private filterSuggestion(filter: string) {
    return (value: any): boolean => {
      if (this.values.includes(value)) {
        return false;
      }

      if (typeof value === 'string') {
        return sanitizeString(value).includes(filter);
      } else {
        return (
          sanitizeString(value[this.nameField]).includes(filter) &&
          !this.values.some((element: any) => element[this.idField] === value[this.idField])
        );
      }
    };
  }

  /**
   * Check if value has match
   * @param {string | Object} value
   * @returns {boolean}
   */
  private hasMatch(value: string | Object): boolean {
    const sanitizedValue = typeof value === 'string' ? sanitizeString(value) : null;

    for (const key in this.matches) {
      if (typeof this.matches[key] === 'string') {
        const sanitizedMatch = sanitizeString(<string>this.matches[key]);

        if (sanitizedMatch === sanitizedValue) {
          return true;
        }
      } else {
        if (typeof value === 'string') {
          const sanitizedMatch = sanitizeString((<any>this.matches[key])[this.nameField]);

          if (sanitizedMatch === sanitizedValue) {
            return true;
          }
        } else {
          if ((<any>this.matches[key])[this.idField] === (<any>value)[this.idField]) {
            return true;
          }
        }
      }
    }
    return false;
  }

  /**
   * Get name by parsing id into object
   * @param id
   * @returns {string}
   */
  private extractNameById(id: any): string {
    const match: any = this.parseObjectById(id);
    if (match) {
      return match[this.nameField];
    } else {
      return '';
    }
  }

  /**
   * Get complex object from id
   * @param id
   * @returns {any}
   */
  private parseObjectById(id: any) {
    if (id === undefined) {
      // There is nothing to check so let's return
      return null;
    }

    // Set the id by the idField if the object is requested to be the form input
    if (!this.valuePrimitive) {
      id = id[this.idField];
    }

    for (const key in this.allMatches) {
      if ((<any>this.allMatches[key])[this.idField] === id) {
        return this.allMatches[key];
      }
    }
    return null;
  }

  /**
   * Extract id field from the complex object by name or return value if it's string
   * @param {string | Object} value
   * @returns {any}
   */
  private extractIdentifier(value: string | Object) {
    if (this.complex) {
      if (typeof value === 'string') {
        const sanitizedValue = sanitizeString(value);
        const match: any = (<Object[]>this.allMatches).find((item: any) => sanitizeString(item[this.nameField]) === sanitizedValue);

        if (match) {
          // Returning a part of the object
          if (this.valuePrimitive) {
            return match[this.idField];
          }

          return match;
        }
        throw Error('Critical error: Match ID could not be extracted.');
      }
      if (this.valuePrimitive) {
        return (<any>value)[this.idField];
      }

      return <any>value;
    }
    return value;
  }

  /**
   * Extract name from complex object or return value if it's string
   * @param {string | Object} value
   * @returns {any}
   */
  private extractName(value: string | Object) {
    if (this.complex && typeof value !== 'string') {
      return (<any>value)[this.nameField];
    }
    return value;
  }

  /**
   * Removes trailing spaces and replaces spaces within text with dashes -
   * uses trimStart and trimEnd from LoDash
   * @param text {string} text to be trimmed and spaces removed
   */
  private cleanUpText(text: string): string {
    // Trim beginning and end
    text = trim(text);

    // Remove special characters allowing '-'
    const regex = /[^\w-\s]/gi;
    text = replace(text, regex, '');

    // Replace all spaces with dashes and storing the text
    text = text.split(' ').join('-');

    // Remove any extra '-';
    text = replace(text, '--', '-');

    // Finally remove '-' at beginning and end
    text = trim(text, '-');

    return text;
  }
}
