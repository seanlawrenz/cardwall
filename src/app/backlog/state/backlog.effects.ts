import { Injectable } from '@angular/core';
import { SignalRService } from '@app/app-services';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of, Observable } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';

import { ShowLoader, HideLoader } from '@app/store/actions/loading.actions';

import { BacklogActionTypes, GetAvailableBoards, GetAvailableBoardsSuccess, GetAvailableBoardsFail } from './backlog.actions';

import { PlanIdentifier, SignalRResult } from '@app/models';

// Loading
type showLoadingTypes = GetAvailableBoards;
type hideLoadingTypes = GetAvailableBoardsSuccess | GetAvailableBoardsFail;

const showLoadingActions = [BacklogActionTypes.GET_AVAILABLE_BOARDS];
const hideLoadingActions = [BacklogActionTypes.GET_AVAILABLE_BOARDS_SUCCESS, BacklogActionTypes.GET_AVAILABLE_BOARDS_FAIL];

@Injectable()
export class BacklogEffects {
  constructor(private actions$: Actions, private signalRService: SignalRService) {}

  @Effect()
  showLoader$: Observable<Action> = this.actions$.pipe(
    ofType<showLoadingTypes>(...showLoadingActions),
    map(() => new ShowLoader()),
  );

  @Effect()
  hideLoader$: Observable<Action> = this.actions$.pipe(
    ofType<hideLoadingTypes>(...hideLoadingActions),
    map(() => new HideLoader()),
  );

  @Effect()
  loadPlans$ = this.actions$.pipe(
    ofType(BacklogActionTypes.GET_AVAILABLE_BOARDS),
    mergeMap((action: GetAvailableBoards) => {
      return this.signalRService.invoke('AvailableCardWallList', []).pipe(
        map((res: SignalRResult) => {
          const plans: PlanIdentifier[] = res.item;
          return new GetAvailableBoardsSuccess(plans);
        }),
        catchError(err => of(new GetAvailableBoardsFail(err))),
      );
    }),
  );
}
