import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import { Card } from '@app/models';

import { TagService } from './tag-service/tag.service';
import { TypeaheadSettings } from '@app/shared/components/muilt-select/muilt-select.interface';

import { replace, trim } from 'lodash';

@Component({
  selector: 'td-add-tags',
  templateUrl: './add-tags.component.html',
  styleUrls: ['./add-tags.component.scss'],
})
export class AddTagsComponent {
  @Input() card: Card;
  @Input() cardForm: FormGroup;

  possibleTags: Observable<string[]>;
  searchText: string;
  typeaheadSettings: TypeaheadSettings;

  constructor(private tagService: TagService) {
    // Setting a debounce time
    this.typeaheadSettings = {
      typeDelay: 500,
      suggestionsLimit: 9,
      buttonClass: 'badge badge-primary d-flex',
      dashCase: true,
    };

    // There is no need for ngInit. When this is built, the ngInit data is passed down by parent components.
    this.possibleTags = this.tagService.getTagSuggestions('');
  }

  resetTheSearch() {
    // Reset the possible tags to default state
    this.possibleTags = this.tagService.getTagSuggestions('');
  }

  selectionChange(event: string) {
    // Clean up the text
    this.searchText = this.cleanUpText(event);
    if (event === '') {
      this.possibleTags = this.tagService.getTagSuggestions('');
    } else {
      this.possibleTags = this.tagService.getTagSuggestions(this.searchText);
    }
  }

  selectedTag(tags: string[]) {
    if (tags === null) {
      return;
    }

    tags.forEach((tag: string) => {
      tag = this.cleanUpText(tag);
      if (tag !== '') {
        this.tagService.addTag(this.card, tag);
      }
    });

    this.resetTheSearch();
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

    // Remove any extra '-'
    text = replace(text, '--', '-');

    // Finally remove '-' at beginning and end
    text = trim(text, '-');

    return text;
  }
}
