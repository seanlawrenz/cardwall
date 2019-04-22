import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Card, SignalRResult, List, CardOperationInfo, Resources } from '@app/models';

import { SignalRService } from './signal-r.service';
import { NotificationService } from './notification.service';

import { getRelativeMoveCardId, moveItemInArray } from '@app/utils';

import { maxBy } from 'lodash';
import { ConfigService } from './config.service';
import { catchError, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  constructor(private signalRService: SignalRService, private notifyService: NotificationService, private config: ConfigService) {}

  moveCardWithInSameList(cards: Card[], newIndex): any {
    const { projectId, planId, listId, id } = cards[newIndex];
    const relativeCardId: number = getRelativeMoveCardId(cards, cards[newIndex], newIndex);
    return new Observable(observer => {
      this.signalRService
        .invoke('CardReorderRelativeTo', projectId, planId, listId, id, relativeCardId)
        .subscribe((response: SignalRResult) => {
          if (!response.isSuccessful) {
            this.notifyService.danger('Problem Reordering Card', response.reason ? response.reason : response.message);
          }
          observer.next(response);
          observer.complete();
        });
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

  copyCard(card, projectId, planId, listId): Observable<SignalRResult> {
    const newListId = listId === '' ? 0 : listId;
    return new Observable(observer => {
      this.signalRService.invoke('CardCopy', card, projectId, planId, newListId).subscribe((result: SignalRResult) => {
        if (!result.isSuccessful) {
          this.notifyService.danger('Problem Copying Card', result.reason ? result.reason : result.message);
        }

        observer.next(result);
        observer.complete();
      });
    });
  }

  buildNewCard(list: List): Observable<CardOperationInfo> {
    const card: Card = {
      attachmentsCount: 0,
      cssClass: 'default',
      description: null,
      endDate: null,
      estimatedHours: 0,
      id: -1,
      isStory: false,
      issuesCount: 0,
      listId: list.id,
      name: 'New Card',
      openIssuesCount: 0,
      openSubtasksCount: 0,
      order: 1,
      owners: [],
      tags: [],
      percentComplete: 0,
      planId: list.planId,
      projectId: list.projectId,
      priorityId: 0,
      remainingHours: 0,
      startDate: null,
      storyPoints: 0,
      subtasksCount: 0,
      ticketAppID: -1,
      ticketID: -1,
      valuePoints: 0,
      version: '0',
      codeCount: 0,
    };

    // Set order
    if (list.cards.length > 0) {
      card.order = maxBy(list.cards, c => c.order).order + 1;
    }

    return new Observable(observer => {
      this.signalRService.invoke('CardCreate', card, false).subscribe((result: SignalRResult) => {
        if (!result.isSuccessful) {
          this.notifyService.danger('Problem Creating Card', result.reason ? result.reason : result.message);
        }
        observer.next(result.item);
        observer.complete();
      });
    });
  }

  assignResource(card: Card, resource: Resources, clearAssignments: boolean): Observable<Card> {
    if (this.config.config.CanEditTasks) {
      if (!clearAssignments && card.owners && card.owners.filter(o => o.referenceId === resource.referenceId).length > 0) {
        this.notifyService.warning(`Already Assigned`, `${resource.name} is already assigned to ${card.name}`);
        return;
      }
      // SignalR wants the opposite of what we have
      return this.signalRService.invoke('CardAssign', card.projectId, card.planId, card.id, resource.uid, clearAssignments).pipe(
        switchMap((result: SignalRResult) => {
          if (!result.isSuccessful) {
            this.notifyService.danger('Could not Assign Resource', result.reason ? result.reason : result.message);
          } else {
            this.notifyService.success(`${resource.name} added`, `${resource.name} added to card ${card.name}`);
          }
          return of(result.item);
        }),
        catchError(err => {
          this.notifyService.danger('Could not Assign Resource', `There was a problem assigning the resource: ${err.message}`);
          return of(err);
        }),
      );
    } else {
      this.notifyService.warning('No Permissions', `You need the 'Edit Tasks' permission to assign resources.`);
    }
  }
}
