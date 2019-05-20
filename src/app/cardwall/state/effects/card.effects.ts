import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { withLatestFrom, switchMap, mergeMap, tap } from 'rxjs/operators';

import { fromRoot } from '@app/store';
import * as cardwallActions from '../actions';
import * as cardwallSelectors from '../selectors';
import * as cardDetailActions from '@app/card-details/state/actions/card.actions';

import { Board, Card } from '@app/models';
import { SignalRService } from '@app/app-services';

import { find } from 'lodash';

@Injectable()
export class CardwallCardEffects {
  constructor(private action$: Actions, private store: Store<fromRoot.State>, private signalR: SignalRService) {}

  loadCard$: Observable<Action> = this.action$.pipe(
    ofType(cardwallActions.CardwallCardActionTypes.FETCH_CARD),
    switchMap((action: cardwallActions.FetchCard) =>
      of(new cardDetailActions.CurrentCard({ card: action.payload.lists[0].cards[0], plan: action.payload })),
    ),
  );
}
