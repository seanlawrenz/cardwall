import { Injectable } from '@angular/core';

import { Card, SignalRResult, List } from '@app/models';
import { SignalRService } from './signal-r.service';

import { getRelativeMoveCardId, moveItemInArray } from '@app/utils';
import { NotificationService } from './notification.service';
import { Observable, of } from 'rxjs';

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

  moveCardUp(destinationList: List, currentIndex: number) {
    const cards = moveItemInArray(destinationList.cards, currentIndex, currentIndex - 1);
    this.moveCardWithInSameList(cards, currentIndex - 1);
  }

  moveCardDown(destinationList: List, currentIndex: number) {
    const cards = moveItemInArray(destinationList.cards, currentIndex, currentIndex + 1);
    this.moveCardWithInSameList(cards, currentIndex + 1);
  }

  moveCardOutsideProjectOrPlan(
    card: Card,
    newProjectId: number,
    newPlanId: number,
    newListId: number,
    relativeCardId: number,
  ): Observable<SignalRResult> {
    return new Observable(observer => {
      this.signalRService.invoke('CardMoveRelativeTo', card, newProjectId, newPlanId, newListId, relativeCardId).subscribe(res => {
        if (!res.isSuccessful) {
          this.notifyService.danger('Problem Moving Card', res.reason ? res.reason : res.message);
        }

        observer.next(res);
        observer.complete();
      });
    });
  }
}
