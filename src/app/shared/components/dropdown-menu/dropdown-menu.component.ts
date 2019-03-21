import { Component, Input, TemplateRef, Output, EventEmitter, ViewChild, ElementRef, forwardRef } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'td-dropdown-menu',
  templateUrl: './dropdown-menu.component.html',
  styleUrls: ['./dropdown-menu.component.scss'],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => DropdownMenuComponent), multi: true }],
})
export class DropdownMenuComponent implements ControlValueAccessor {
  /** field to use from objects as name */
  @Input() nameField: string;
  /** field to use from objects as id */
  @Input() idField: string;
  /** If an item has to be selected. */
  @Input() forceSelection = false;
  /** For local filtering */
  @Input() localFilter = false;
  /**delay before triggering search. */
  @Input() typeAheadDelay = 500;
  /** class to apply to the inner input field */
  @Input() inputClass = 'form-control form-control-sm';
  /** value of the placeholder attribute of the inner input field */
  @Input() inputPlaceholder = '';
  /** class to apply to the loading icon element */
  @Input() loadingIconClass = 'tdNg-loading';
  /** Text on the Label for the input. This is for accessibility only */
  @Input() inputLabel = 'Search';
  /** class to apply to the loading icon element */
  @Input() triggerIconClass = 'toggle';
  /** Value for none selected or remove selected */
  @Input() emptyClass: any = null;
  /** If true displays a clear button */
  @Input() clearButton = true;
  @Input() disabledField: string = null;
  /** text to appear when the input text does not match any item of the selection list. */
  @Input() noMatchesText = '';
  @Input() editable = true;
  @Input() remote = false;
  /** Template for the items in the dropdown menu */
  @Input() dropDownMenuTemplate: TemplateRef<any>;
  /** Template for the items in the input menu */
  @Input() selectedTemplate: TemplateRef<any>;

  @Output() onSelect = new EventEmitter<string>();
  @Output() onInitValue = new EventEmitter<string>();

  @ViewChild('inputField') _input: any;

  hideList = true;
  listData: any[];

  private _loading = false;
  private _listDataSubscription: Subscription;
  private _aheadTimer: any;
  private _currVal: string;
  private _marked: number = null;
  private _initialData: any[];
  private _hasFocus = false;
  private _tmpVal: any;
  private _enterCued = false;
  private _noBlur = false;

  // ControlValueAccessor props
  private propagateTouch = () => {};
  private propagateChange = (_: any) => {};

  constructor(private scrollElement: ElementRef) {}

  /** Data for the dropdown */
  @Input()
  set data(value: Observable<Object[]> | Object[]) {
    if (this._listDataSubscription) {
      this._listDataSubscription.unsubscribe();
    }

    if (value instanceof Observable) {
      const listData = <Observable<Object[]>>value;
      this._listDataSubscription = listData.subscribe((data: any) => {
        this.listData = this._initialData = data;
        this.loading = false;
        if (0 === this._tmpVal || this._tmpVal) {
          this.writeValue(this._tmpVal);
        }
      });
    } else {
      const data = <Object[]>value;
      this.listData = this._initialData = data;
      this.loading = false;

      // If the list data change, trigger a reprocessing.
      this.loadData();
    }
  }

  /**
   * The display info for a selected value
   */
  @Input()
  set currVal(value: string) {
    if (this.emptyClass !== null && value === this.emptyClass) {
      this._currVal = undefined;
    } else {
      this._currVal = value;
    }
    this._tmpVal = null;
    this.marked = null;
    this.hideList = !this._hasFocus && !this._noBlur;

    clearTimeout(this._aheadTimer);
    if (!this._currVal) {
      this.sendModelChange(null);
    }

    this._aheadTimer = setTimeout(this.loadData.bind(this), this.typeAheadDelay);
  }

  get currVal(): string {
    return this._currVal;
  }

  /**
   * Sets the list data item has been selected
   */
  set marked(value: number) {
    if (value === null) {
      this._marked = value;
    } else if (this.listData && 0 <= value && this.listData.length >= value - 1) {
      this._marked = value;
      // use private var to prevent query trigger
      this._currVal = this.getDisplayValue(this.listData[this._marked]);
    }
    this.scrollToMarkedElement();
  }

  get marked(): number {
    return this._marked;
  }

  /**
   * Sets a loading image
   */
  set loading(loading: boolean) {
    this._loading = loading;
    if (!loading && this._enterCued) {
      this._enterCued = false;
      this.handleEnter();
    }
  }

  get loading(): boolean {
    return this._loading;
  }

  /**
   * Listener for keyboard event
   * @param event {KeyboardEvent}
   */
  onKeyDown(event: KeyboardEvent) {
    const code = event.which || event.keyCode;
    switch (code) {
      case 13:
        event.preventDefault();
        this.handleEnter();
        break;
      case 38:
        event.preventDefault();
        this.handleUp();
        break;
      case 40:
        event.preventDefault();
        this.handleDown();
        break;
      default:
        if (!this.editable) {
          event.preventDefault();
          event.stopImmediatePropagation();
          return false;
        }
        break;
    }
  }

  /**
   * Event for mouseclick
   * @param index {number} The index of the list data item selected
   * @param item {Object} The item selected
   */
  onItemClick(index: number, item: Object) {
    if (this.isDisabled(item)) {
      return;
    }
    this._noBlur = false;
    this.marked = index;

    this.onSelect.emit(this.listData[this.marked]);
    this.sendModelChange(this.listData[this.marked]);

    this.hideList = true;

    if (!this.localFilter) {
      this.listData = this._initialData;
    }
  }

  /**
   * Listener for blur on input
   * @param event {FocusEvent}
   */
  onFieldBlur(event: FocusEvent) {
    this._hasFocus = false;
    if (this._noBlur) {
      return;
    }

    // Timeout for hide to catch click event on list
    setTimeout(() => {
      this.handleEnter();
    }, 200);

    this.propagateTouch();
  }

  /**
   * Listener for the dropdown field focus
   */
  onFieldFocus() {
    this._hasFocus = true;
    this.hideList = false;
    if (!this.editable) {
      this.clear();
    }
    this.loadData();
  }

  onMouseEnterList() {
    this._noBlur = true;
  }

  onMouseLeaveList() {
    this._noBlur = false;
  }

  /**
   * Returns if an item is disabled
   * @param value {Object} The list data item
   */
  isDisabled(value: Object): boolean {
    if (!this.disabledField) {
      return false;
    }

    return !!value[this.disabledField];
  }

  /**
   * Returns if the item is marked
   * @param value {Object} The list data item
   */
  isMarked(value: Object): boolean {
    if (this.marked === null) {
      return false;
    }
    return this.listData[this.marked] === value;
  }

  /**
   * The clearButton function. Removes any selections
   */
  removeSelected() {
    if (this.disabledField === null) {
      this.currVal = undefined;

      this.sendModelChange(this.emptyClass);
    }
  }

  /**
   * Nuclear clear options. Removes all data
   */
  private clear() {
    if (this.emptyClass) {
      this.currVal = this.emptyClass;
    } else {
      this.currVal = '';
    }
    this.listData = [];
  }

  /**
   * Event handler for listeners
   */
  private handleEnter() {
    if (!this.loading) {
      // try to determine marked (look if item is in list)
      if (!this.marked) {
        for (let i = 0; i < this.listData.length; i++) {
          if (this.currVal === this.getDisplayValue(this.listData[i])) {
            this.marked = i;
            break;
          }
        }
      }
      if (this.marked === null) {
        if (this.forceSelection) {
          this.onSelect.emit(null);
          this.sendModelChange(null);
          this.clear();
        } else {
          // This may causes error
          this.sendModelChange(this.currVal);
        }
      } else {
        const item = this.listData[this.marked];
        if (this.isDisabled(item)) {
          return;
        }
        this.onSelect.emit(this.listData[this.marked]);
        this.sendModelChange(this.listData[this.marked]);
      }

      this.hideList = true;

      if (!this.localFilter) {
        this.listData = this._initialData;
      }
    } else {
      this._enterCued = true;
    }
  }

  private handleUp() {
    if (this.marked !== null && this.marked > 0) {
      this.marked--;
    } else {
      this.marked = 0;
    }
  }

  private handleDown() {
    if (this.marked !== null && this.marked >= 0) {
      if (this.marked < this.listData.length - 1) {
        this.marked++;
      }
    } else {
      this.marked = 0;
    }
  }

  /**
   * Determines the display value
   * @param val {any} The value of list data item
   */
  getDisplayValue(val: any) {
    let result: any = val;

    if (!this.nameField || !val) {
      return null;
    }

    if (this.emptyClass !== null && val === this.emptyClass) {
      return null;
    }

    this.nameField.split('.').forEach(index => {
      result = result[index];
    });

    return result;
  }

  /**
   * Determines the value to be pushed to the ngModel.
   * @param val {any} The value of the list data item
   */
  private getValueValue(val: any): any {
    let result: any = val;

    // No ID field return the value
    if (!this.idField || !val) {
      return val;
    }

    // Is there an emptyClass and does the value equal it
    if (this.emptyClass !== null && val === this.emptyClass) {
      val = this.emptyClass;
      return val;
    }

    // Find the list data item via idField
    this.idField.split('.').forEach(index => {
      result = result[index];
    });

    return result;
  }

  /**
   * Loads the data
   * Set up to have local storage. I might need this for task, but not sure yet
   */
  private loadData() {
    if (!this.remote) {
      if (this.localFilter) {
        this.data = this._initialData.filter(item => {
          if (!this.currVal) {
            return true;
          } else {
            return (
              -1 !==
              this.getDisplayValue(item)
                .toLowerCase()
                .indexOf(this.currVal.toLowerCase())
            );
          }
        });
      }
    } else {
      this.loading = true;
    }
  }

  /**
   * Sets the ngModel value via ControlValueAccessor noops
   * @param val {any} The value to be pushed to the ngModel
   */
  private sendModelChange(val: any) {
    this.propagateChange(this.getValueValue(val));
  }

  private searchValueObject(value: any): any {
    if (false === value instanceof Object && this.idField && this._initialData) {
      this._initialData.forEach(item => {
        if (value === this.getValueValue(item)) {
          value = item;
        }
      });
    }
    return value;
  }

  /**
   * Pushes a selected item into view
   */
  private scrollToMarkedElement() {
    const element = this.scrollElement.nativeElement.querySelector(`.tdNg-combo-list .item:nth-child(${this.marked + 1})`);

    const alignToTop = false;

    if (element !== null) {
      element.scrollIntoView(alignToTop);
    }
  }

  /**
   * Opens the dropdown list
   */
  onTriggerClick() {
    if (this.hideList) {
      this._input.nativeElement.focus();
      return;
    }
    this._input.nativeElement.blur();
  }

  /**
   * Angular method. Writes to ngModel.
   * This is the method that allows ControlValueAccessor to write to the input
   * @param value {any} value to write to ControlValueAccessor
   */
  writeValue(value: any): void {
    value = this.searchValueObject(value);

    if (value instanceof Object && this.getDisplayValue(value)) {
      this.currVal = this.getDisplayValue(value);
    } else {
      this._tmpVal = value;
    }

    this.onInitValue.emit(value);
  }

  /**
   * Angular method. Signals changes to the ngModel
   * @param fn {function}
   */
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  /**
   * Angular method. Signals changes to the ngModel via touch
   * @param fn {function}
   */
  registerOnTouched(fn: any): void {
    this.propagateTouch = fn;
  }
}
