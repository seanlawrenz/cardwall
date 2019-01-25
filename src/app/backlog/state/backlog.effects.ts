import { Injectable } from '@angular/core';
import { SignalRService } from '@app/app-services';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { BacklogActionTypes, GetAvailableBoards, GetAvailableBoardsSuccess, GetAvailableBoardsFail } from './backlog.actions';
import { PlanIdentifier } from '@app/models';
import { of } from 'rxjs';

@Injectable()
export class BacklogEffects {
  constructor(private actions$: Actions, private signalRService: SignalRService) {}

  @Effect()
  loadPlans$ = this.actions$.pipe(
    ofType(BacklogActionTypes.GET_AVAILABLE_BOARDS),
    mergeMap((action: GetAvailableBoards) => {
      return this.signalRService.invoke('AvailableCardWallList', []).pipe(
        map((plans: PlanIdentifier[]) => {
          return new GetAvailableBoardsSuccess(plans);
        }),
        catchError(err => of(new GetAvailableBoardsFail(err))),
      );
    }),
  );
}
