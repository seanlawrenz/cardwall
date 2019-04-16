import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';

import { SignalRService } from '@app/app-services';

import * as actions from '../actions';
import { SignalRResult } from '@app/models';

@Injectable()
export class BacklogCardEffects {
  constructor(private actions$: Actions, private signalR: SignalRService) {}

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
}
