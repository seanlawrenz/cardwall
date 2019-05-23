import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { withLatestFrom, switchMap, mergeMap, tap, map } from 'rxjs/operators';

import { fromRoot } from '@app/store';
import * as cardwallActions from '../actions';
import * as cardwallSelectors from '../selectors';
import * as cardDetailActions from '@app/card-details/state/actions/card.actions';

import { Board, Card, List, SignalRResult } from '@app/models';
import { SignalRService, CardService } from '@app/app-services';

import { find } from 'lodash';

@Injectable()
export class CardwallCardEffects {
  constructor(
    private action$: Actions,
    private store: Store<fromRoot.State>,
    private signalR: SignalRService,
    private cardService: CardService,
  ) {}

  @Effect()
  loadCard$: Observable<Action> = this.action$.pipe(
    ofType(cardwallActions.CardwallCardActionTypes.FETCH_CARD),
    switchMap((action: cardwallActions.FetchCard) =>
      of(new cardDetailActions.CurrentCard({ card: action.payload.lists[0].cards[0], plan: action.payload })),
    ),
  );

  @Effect()
  moveCardToNewList$: Observable<Action> = this.action$.pipe(
    ofType(cardwallActions.CardwallCardActionTypes.CARD_MOVE_TO_NEW_LIST),
    withLatestFrom(this.store.select(cardwallSelectors.getLists), (action: cardwallActions.CardMoveToNewList, lists: List[]) => {
      const listThatCardIsMovingToCards: Card[] = find(lists, l => l.id === action.payload.card.listId).cards;
      return {
        newListCards: listThatCardIsMovingToCards,
        card: action.payload.card,
        oldListId: action.payload.listId,
        newIndex: action.payload.newIndex,
      };
    }),
    switchMap((payload: { newListCards: Card[]; card: Card; oldListId: number; newIndex: number }) =>
      this.cardService
        .moveCardToListInSameBoard(payload.newListCards, payload.card, payload.oldListId, payload.newIndex)
        .pipe(map((result: SignalRResult) => new cardwallActions.CardMoveToNewListSuccess())),
    ),
  );
}
