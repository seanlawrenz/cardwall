import { Injectable } from '@angular/core';
import { NotificationService, SignalRService } from '@app/app-services';
import { Observable, of } from 'rxjs';
import { isNullOrUndefined } from 'util';
import { map, catchError } from 'rxjs/operators';
import { Card, SignalRResult } from '@app/models';

@Injectable({
  providedIn: 'root',
})
export class TagService {
  constructor(private signalRService: SignalRService, private notification: NotificationService) {}

  getTagSuggestions(searchText: string): Observable<string[]> {
    if (isNullOrUndefined(searchText)) {
      searchText = '';
    }

    return this.signalRService.invoke('GetTagSuggestions', searchText).pipe(
      map((result: SignalRResult) => {
        return result.item;
      }),
      catchError(error => this.handleError(error)),
    );
  }

  addTag(card: Card, tag: string): boolean {
    if (!card || !tag) {
      return false;
    }

    if (!card.tags) {
      card.tags = [];
    }

    // Ensure we're not adding a duplicate value;
    if (card.tags.filter(t => t === tag).length <= 0) {
      card.tags.push(tag);
      return true;
    }

    return false;
  }

  removeTag(card: Card, tag: string): boolean {
    if (!card || !tag) {
      return false;
    }

    const index = card.tags.findIndex(t => t === tag);
    if (index > -1) {
      card.tags.splice(index, 1);
      return true;
    }

    return false;
  }

  private handleError(error) {
    this.notification.danger('Problem Getting tags', error);
    return of([]);
  }
}
