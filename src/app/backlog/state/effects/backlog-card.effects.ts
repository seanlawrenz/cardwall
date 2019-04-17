import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';

import { fromRoot } from '@app/store';
import * as cardActions from '@app/store/actions/card.actions';
import * as actions from '../actions';
import * as cardDetailsActions from '@app/card-details/state/actions';
import * as backlogSelectors from '../selectors';

import { SignalRService, CardService } from '@app/app-services';
import { List, SignalRResult, CardOperationInfo, Plan } from '@app/models';

import { find } from 'lodash';

@Injectable()
export class BacklogCardEffects {
  constructor(
    private actions$: Actions,
    private signalR: SignalRService,
    private cardService: CardService,
    private store: Store<fromRoot.State>,
  ) {}

  @Effect()
  archiveCardOnBacklog$: Observable<Action> = this.actions$.pipe(
    ofType(actions.BacklogCardActionTypes.ARCHIVE_CARD),
    switchMap(({ payload: { card, useRemainingHours, originalCard } }) =>
      this.signalR.invoke('CardUpdate', card, useRemainingHours, null).pipe(
        map((res: SignalRResult) =>
          res.isSuccessful ? new actions.ArchiveCardSuccess(originalCard) : new actions.ArchiveCardError(res.message),
        ),
        catchError(err => of(new actions.ArchiveCardError(err))),
      ),
    ),
  );

  @Effect()
  addNewCardToBacklog$: Observable<Action> = this.actions$.pipe(
    ofType(actions.BacklogCardActionTypes.ADD_CARD),
    switchMap((action: { payload: List }) => this.cardService.buildNewCard(action.payload)),
    switchMap((res: CardOperationInfo) => [new actions.AddCardToBacklogSuccess(res), new cardActions.CardSelected(res.card)]),
    catchError(err => of(new actions.AddCardToBacklogError(err))),
  );

  @Effect()
  openNewCardDetails$: Observable<Action> = this.actions$.pipe(
    ofType(actions.BacklogCardActionTypes.ADD_CARD_SUCCESS),
    withLatestFrom(this.store.select(backlogSelectors.getPlans), (action: { payload: CardOperationInfo }, plans: Plan[]) => {
      const {
        payload: { card },
      } = action;
      const plan: Plan = find(plans, p => p.id === card.planId);
      return {
        plan,
        card,
      };
    }),
    switchMap(({ plan, card }) => [new cardDetailsActions.CurrentCard({ card, plan }), new cardDetailsActions.ShowForm()]),
  );
}
