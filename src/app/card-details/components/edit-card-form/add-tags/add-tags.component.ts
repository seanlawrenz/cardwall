import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import { Card, SignalRResult } from '@app/models';

import { replace, trim } from 'lodash';
import { concat, Subject, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap, switchMap, map } from 'rxjs/operators';
import { SignalRService } from '@app/app-services';

@Component({
  selector: 'td-add-tags',
  templateUrl: './add-tags.component.html',
  styleUrls: ['./add-tags.component.scss'],
})
export class AddTagsComponent implements OnInit {
  @Input() card: Card;
  @Input() cardForm: FormGroup;

  possibleTags$: Observable<string[]>;
  tagInput$ = new Subject<string>();
  loading = false;
  searchText: string;

  constructor(private cdr: ChangeDetectorRef, private signalRService: SignalRService) {}

  ngOnInit() {
    this.loadTags();
  }

  private loadTags() {
    this.possibleTags$ = concat(
      this.signalRService.invoke('GetTagSuggestions', '').pipe(map((rsp: SignalRResult) => rsp.item)),
      this.tagInput$.pipe(
        debounceTime(200),
        distinctUntilChanged(),
        tap(() => ((this.loading = true), this.cdr.markForCheck())),
        switchMap(term =>
          this.signalRService.invoke('GetTagSuggestions', this.cleanUpText(term)).pipe(
            map((rsp: SignalRResult) => rsp.item),
            tap(() => (this.loading = false)),
          ),
        ),
      ),
    );
  }

  /**
   * Removes trailing spaces and replaces spaces within text with dashes -
   * uses trimStart and trimEnd from LoDash
   * @param text {string} text to be trimmed and spaces removed
   */
  cleanUpText(text: string): string {
    // Trim beginning and end
    text = trim(text);

    // Remove special characters allowing '-'
    const regex = /[^\w-\s]/gi;
    text = replace(text, regex, '');

    // Replace all spaces with dashes and storing the text
    text = text.split(' ').join('-');

    // Remove any extra '-'
    text = replace(text, '--', '-');

    // Finally remove '-' at beginning and end
    text = trim(text, '-');

    return text;
  }
}
