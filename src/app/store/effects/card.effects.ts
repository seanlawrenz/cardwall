import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { SignalRService } from '@app/app-services';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { switchMap, catchError, map } from 'rxjs/operators';

import * as actions from '../actions';
import { List, SignalRResult } from '@app/models';

import { find, maxBy } from 'lodash';
import { standardErrorLang } from '@app/constants';

@Injectable()
export class CardEffects {
  constructor(private actions$: Actions, private signalR: SignalRService) {}

  @Effect()
  archiveCard$: Observable<Action> = this.actions$.pipe(
    ofType(actions.CardActionTypes.ARCHIVE_CARD),
    switchMap((action: actions.ArchiveCard) => {
      const {
        payload: { plan, card },
      } = action;
      const archiveList: List = find(plan.lists, list => list.id === 0);
      const cardThatWasArchived = { ...card };

      let maxOrder = 1;
      if (archiveList.cards.length > 0) {
        maxOrder = maxBy(archiveList.cards, c => c.order).order;
      }

      // Set the card to the archive list
      card.order = maxOrder;
      card.listId = 0;

      return this.signalR.invoke('CardUpdate', card, plan.useRemainingHours, null).pipe(
        map((result: SignalRResult) => {
          if (result.isSuccessful) {
            return new actions.ArchiveCardSuccess(cardThatWasArchived);
          } else {
            return new actions.ArchiveCardError({ message: result.message, reason: result.reason });
          }
        }),
        catchError(err => of(new actions.ArchiveCardError({ message: 'Server Error', reason: standardErrorLang }))),
      );
    }),
  );

  @Effect()
  deleteCard$: Observable<Action> = this.actions$.pipe(
    ofType(actions.CardActionTypes.DELETE_CARD),
    switchMap((action: actions.DeleteCard) =>
      this.signalR.invoke('CardDelete', action.payload.projectId, action.payload.planId, action.payload.id).pipe(
        map((result: SignalRResult) => {
          if (result.isSuccessful) {
            return new actions.DeleteCardSuccess(action.payload);
          } else {
            return new actions.DeleteCardError({ message: result.message, reason: result.reason });
          }
        }),
        catchError(err => of(new actions.DeleteCardError({ message: 'Server Error', reason: standardErrorLang }))),
      ),
    ),
  );
}
