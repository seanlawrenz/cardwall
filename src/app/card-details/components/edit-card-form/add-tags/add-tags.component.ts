import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Card } from '@app/models';
import { FormGroup } from '@angular/forms';
import { Subject, Observable, of, concat } from 'rxjs';
import { distinctUntilChanged, debounceTime, switchMap, tap, catchError } from 'rxjs/operators';

import { TagService } from './tag-service/tag.service';

import { replace, trim } from 'lodash';

@Component({
  selector: 'td-add-tags',
  changeDetection: ChangeDetectionStrategy.Default,
  templateUrl: './add-tags.component.html',
  styleUrls: ['./add-tags.component.scss'],
})
export class AddTagsComponent implements OnInit {
  @Input() card: Card;
  @Input() cardForm: FormGroup;

  tags$: Observable<string[]>;
  loading = false;
  tagInput$ = new Subject<string>();
  searchText: string;

  constructor(private tagService: TagService) {}

  ngOnInit() {
    this.search();
  }

  addTag(tag: string) {
    this.tagService.addTag(this.card, this.cleanUpText(tag));
  }

  search() {
    this.tags$ = concat(
      this.tagService.getTagSuggestions(''),
      this.tagInput$.pipe(
        debounceTime(200),
        distinctUntilChanged(),
        tap(() => (this.loading = true)),
        switchMap(term => {
          term = this.cleanUpText(term);
          return this.tagService.getTagSuggestions(term).pipe(tap(() => (this.loading = false)));
        }),
      ),
    );
  }

  private cleanUpText(text: string): string {
    text = trim(text);

    // Remove special characters allowing '-'
    const regex = /[^\w-\s]/gi;
    text = replace(text, regex, '');

    text = text.split(' ').join('-');

    text = replace(text, '--', '-');

    // Finally remove '-' at beginning and end
    text = trim(text, '-');

    return text;
  }
}
