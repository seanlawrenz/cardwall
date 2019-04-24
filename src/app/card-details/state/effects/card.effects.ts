import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of, Observable } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';

import * as cardDetailActions from '../actions';

import { Card, Plan, Board, SignalRResult } from '@app/models';
import { SignalRService, NotificationService } from '@app/app-services';
import { removeItem, insertItem } from '@app/utils';

@Injectable()
export class CardDetailsCardEffects {
  constructor(private actions$: Actions, private signalR: SignalRService, private notify: NotificationService) {}

  @Effect()
  showCardDetailsForCard$ = this.actions$.pipe(
    ofType(cardDetailActions.CardDetailsCardTypes.CURRENT_CARD),
    switchMap(action => of(new cardDetailActions.ShowDetails())),
  );

  @Effect()
  addToMyWork$: Observable<Action> = this.actions$.pipe(
    ofType(cardDetailActions.CardDetailsCardTypes.ADD_TO_MY_WORK),
    switchMap((action: { payload: { card: Card; plan: Plan | Board } }) => {
      const {
        payload: { card, plan },
      } = action;
      return this.signalR.invoke('MyWorkSet', 2, card.projectId, card.planId, card.id, true).pipe(
        map((result: SignalRResult) => {
          if (result.isSuccessful) {
            const planToUpdate = { ...plan };
            planToUpdate.myWorkTaskIDs = insertItem(planToUpdate.myWorkTaskIDs, {
              index: planToUpdate.myWorkTaskIDs.splice.length + 1,
              item: card.id,
            });
            this.notify.success('Success', `${card.name} has been added to your work`);
            return new cardDetailActions.MyWorkSuccess(planToUpdate);
          } else {
            this.notify.danger('Problem Adding to your work', result.message);
            return new cardDetailActions.MyWorkError(result.message);
          }
        }),
        catchError(err => of(new cardDetailActions.MyWorkError(err))),
      );
    }),
  );

  @Effect()
  removeFromMyWork$: Observable<Action> = this.actions$.pipe(
    ofType(cardDetailActions.CardDetailsCardTypes.REMOVE_FROM_MY_WORK),
    switchMap((action: { payload: { card: Card; plan: Plan | Board } }) => {
      const {
        payload: { card, plan },
      } = action;
      return this.signalR.invoke('MyWorkSet', 2, card.projectId, card.planId, card.id, false).pipe(
        map((result: SignalRResult) => {
          if (result.isSuccessful) {
            const planToUpdate = { ...plan };
            const index = plan.myWorkTaskIDs.findIndex(i => i === card.id);
            if (index) {
              planToUpdate.myWorkTaskIDs = removeItem(planToUpdate.myWorkTaskIDs, index);
            }
            this.notify.success('Success', `${card.name} has been removed from your work`);
            return new cardDetailActions.MyWorkSuccess(planToUpdate);
          } else {
            this.notify.danger('Problem Adding to your work', result.message);
            return new cardDetailActions.MyWorkError(result.message);
          }
        }),
        catchError(err => of(new cardDetailActions.MyWorkError(err))),
      );
    }),
  );
}
