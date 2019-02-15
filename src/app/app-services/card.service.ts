import { Injectable } from '@angular/core';

import { Card, SignalRResult } from '@app/models';
import { SignalRService } from './signal-r.service';

import { getRelativeMoveCardId } from '@app/utils';
import { NotificationService } from './notification.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  constructor(private signalRService: SignalRService, private notifyService: NotificationService) {}

  moveCardWithInSameList(cards: Card[], newIndex): any {
    const { projectId, planId, listId, id } = cards[newIndex];
    const relativeCardId: number = getRelativeMoveCardId(cards, cards[newIndex], newIndex);
    this.signalRService
      .invoke('CardReorderRelativeTo', projectId, planId, listId, id, relativeCardId)
      .subscribe((response: SignalRResult) => {
        if (!response.isSuccessful) {
          this.notifyService.danger('Problem Reordering Card', response.reason ? response.reason : response.message);
        }
      });
  }

  moveCardToListInSameBoard(newListCards: Card[], card: Card, oldListId: number, newIndex: number): Observable<any> {
    return new Observable(observer => {
      const relativeCardId: number = getRelativeMoveCardId(newListCards, card, newIndex);
      this.signalRService
        .invoke('CardMoveWithinPlan', card.projectId, card.planId, oldListId, card.listId, card.id, relativeCardId, false)
        .subscribe(res => {
          if (!res.isSuccessful) {
            this.notifyService.danger(`Problem Moving Card`, res.reason ? res.reason : res.message);
          }
          observer.next(res);
          observer.complete();
        });
    });
  }
}
