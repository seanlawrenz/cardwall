import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';

import * as subtasksActions from '../actions/subtasks.actions';

import { SignalRService } from '@app/app-services';
import { Card, SignalRResult } from '@app/models';

@Injectable()
export class CardDetailsSubtasksEffects {
  constructor(private actions$: Actions, private signalR: SignalRService) {}

  @Effect()
  fetchSubtaks$: Observable<Action> = this.actions$.pipe(
    ofType(subtasksActions.CardDetailsSubtasksTypes.FETCH_SUBTASKS),
    switchMap((action: { payload: Card }) => {
      const {
        payload: { projectId, planId, id },
      } = action;
      return this.signalR.invoke('SubtaskList', projectId, planId, id).pipe(
        map((result: SignalRResult) => {
          if (result.isSuccessful) {
            return new subtasksActions.FetchSubtasksSuccess(result.item);
          } else {
            return new subtasksActions.FetchSubtasksError(result.message);
          }
        }),
        catchError(err => of(new subtasksActions.FetchSubtasksError(err))),
      );
    }),
  );
}
