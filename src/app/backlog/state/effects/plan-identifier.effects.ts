import { Injectable } from '@angular/core';
import { Store, Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { SignalRService } from '@app/app-services';
import { Observable, of } from 'rxjs';
import { map, withLatestFrom, mergeMap, catchError } from 'rxjs/operators';

import { fromRoot } from '@app/store';
import * as selectors from '../selectors';
import * as planActions from '../actions/plan-identifiers.action';

import { ShowLoader, HideLoader } from '@app/store/actions/loading.actions';
import { SignalRResult, PlanIdentifier } from '@app/models';

// Loading
type showLoadingTypes = planActions.GetAvailablePlanIdentifers;
type hideLoadingTypes = planActions.GetAvailablePlansIdentifersSuccess | planActions.GetAvailablePlansIdentifersFail;

const showLoadingActions = [planActions.PlanIdentifiersActionTypes.GET_AVAILABLE_PLAN_IDENTIFERS];
const hideLoadingActions = [
  planActions.PlanIdentifiersActionTypes.GET_AVAILABLE_PLAN_IDENTIFERS_SUCCESS,
  planActions.PlanIdentifiersActionTypes.GET_AVAILABLE_PLAN_IDENTIFERS_FAIL,
];

@Injectable()
export class PlanIdentifierEffects {
  constructor(private actions$: Actions, private signalR: SignalRService, private store: Store<fromRoot.State>) {}

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
  loadPlansIdentifiers$ = this.actions$.pipe(
    ofType(planActions.PlanIdentifiersActionTypes.GET_AVAILABLE_PLAN_IDENTIFERS),
    withLatestFrom(this.store.select(selectors.getPlans), (action, plans) => {
      if (plans.length > 0) {
        return plans.map(plan => plan.id);
      } else {
        return [];
      }
    }),
    mergeMap(boards => {
      return this.signalR.invoke('AvailableCardWallList', boards).pipe(
        map((res: SignalRResult) => {
          const plans: PlanIdentifier[] = res.item;
          return new planActions.GetAvailablePlansIdentifersSuccess(plans);
        }),
        catchError(err => of(new planActions.GetAvailablePlansIdentifersFail(err))),
      );
    }),
  );
}
