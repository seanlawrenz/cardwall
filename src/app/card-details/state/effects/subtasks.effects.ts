import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';

import * as subtasksActions from '../actions/subtasks.actions';

import { SignalRService } from '@app/app-services';
import { Card, SignalRResult, Subtask } from '@app/models';

@Injectable()
export class CardDetailsSubtasksEffects {
  constructor(private actions$: Actions, private signalR: SignalRService) {}

  @Effect()
  fetchSubtasks$: Observable<Action> = this.actions$.pipe(
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

  @Effect()
  updateSubtask$: Observable<Action> = this.actions$.pipe(
    ofType(subtasksActions.CardDetailsSubtasksTypes.UPDATE_SUBTASK),
    switchMap((action: { payload: { subtask: Subtask; card: Card } }) => {
      const {
        payload: { subtask, card },
      } = action;
      return this.signalR.invoke('SubtaskUpdate', card.projectId, card.planId, card.id, subtask).pipe(
        map((result: SignalRResult) => {
          if (result.isSuccessful) {
            return new subtasksActions.UpdateSubtaskSuccess(subtask);
          } else {
            return new subtasksActions.UpdateSubtaskError(result.reason ? result.reason : result.message);
          }
        }),
        catchError(err => of(new subtasksActions.UpdateSubtaskError(err))),
      );
    }),
  );
}
