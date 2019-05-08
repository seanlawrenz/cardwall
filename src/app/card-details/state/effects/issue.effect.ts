import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';

import * as cardDetailActions from '../actions';

import { SignalRService } from '@app/app-services';
import { SignalRResult } from '@app/models';
import { standardErrorLang } from '@app/constants';

@Injectable()
export class CardDetailsIssueEffects {
  constructor(private actions$: Actions, private signalR: SignalRService) {}

  @Effect()
  fetchIssues$: Observable<Action> = this.actions$.pipe(
    ofType(cardDetailActions.CardDetailsIssueTypes.FETCH_ISSUES),
    switchMap((action: cardDetailActions.FetchIssues) =>
      this.signalR.invoke('IssueList', action.payload.projectId, action.payload.planId, action.payload.id).pipe(
        map((result: SignalRResult) => {
          if (result.isSuccessful) {
            return new cardDetailActions.FetchIssuesSuccess(result.item);
          } else {
            // Signal R does not return a reason on this call
            return new cardDetailActions.FetchSubtasksError({ message: result.message, reason: '' });
          }
        }),
        catchError(err => of(new cardDetailActions.FetchSubtasksError({ message: 'Server Error', reason: standardErrorLang }))),
      ),
    ),
  );
}
