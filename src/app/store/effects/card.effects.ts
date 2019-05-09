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
  constructor(private actives$: Actions, private signalR: SignalRService) {}

  @Effect()
  archiveCard$: Observable<Action> = this.actives$.pipe(
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
}
