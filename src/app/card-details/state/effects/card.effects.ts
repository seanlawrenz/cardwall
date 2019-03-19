import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import * as cardDetailActions from '../actions';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class CardDetailsCardEffects {
  constructor(private actions$: Actions) {}

  @Effect()
  showCardDetailsForCard$ = this.actions$.pipe(
    ofType(cardDetailActions.CardDetailsCardTypes.CURRENT_CARD),
    switchMap(action => of(new cardDetailActions.ShowDetails())),
  );
}
