import { Injectable } from '@angular/core';
import { BoardService, SignalRService } from '@app/app-services';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of, Observable } from 'rxjs';
import { mergeMap, map, catchError, withLatestFrom, exhaustMap } from 'rxjs/operators';
import { find } from 'lodash';

import { fromRoot } from '@app/store';

import { ShowLoader, HideLoader } from '@app/store/actions/loading.actions';

import * as fromBacklog from '../state';
import * as backlogActions from './backlog.actions';

import { PlanIdentifier, SignalRResult, Plan, List } from '@app/models';

// Loading
type showLoadingTypes = backlogActions.GetAvailablePlans;
type hideLoadingTypes = backlogActions.GetAvailablePlansSuccess | backlogActions.GetAvailablePlansFail;

const showLoadingActions = [backlogActions.BacklogActionTypes.GET_AVAILABLE_PLAN_IDENTIFERS];
const hideLoadingActions = [
  backlogActions.BacklogActionTypes.GET_AVAILABLE_PLAN_IDENTIFERS_SUCCESS,
  backlogActions.BacklogActionTypes.GET_AVAILABLE_PLAN_IDENTIFERS_FAIL,
];

@Injectable()
export class BacklogEffects {
  constructor(
    private actions$: Actions,
    private signalRService: SignalRService,
    private boardService: BoardService,
    private store: Store<fromRoot.State>,
  ) {}

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
    ofType(backlogActions.BacklogActionTypes.GET_AVAILABLE_PLAN_IDENTIFERS),
    withLatestFrom(this.store.select(fromBacklog.getBoards), (action, boards) => {
      if (boards.length > 0) {
        return boards.map(board => board.id);
      } else {
        return [];
      }
    }),
    mergeMap(boards => {
      return this.signalRService.invoke('AvailableCardWallList', boards).pipe(
        map((res: SignalRResult) => {
          const plans: PlanIdentifier[] = res.item;
          return new backlogActions.GetAvailablePlansSuccess(plans);
        }),
        catchError(err => of(new backlogActions.GetAvailablePlansFail(err))),
      );
    }),
  );

  @Effect()
  loadPlansOnParams$ = this.actions$.pipe(
    ofType(backlogActions.BacklogActionTypes.GET_PLANS_IN_PARAMS),
    withLatestFrom(this.store.select(fromRoot.getRouterState), (action, router) => {
      const {
        state: {
          queryParams: { boards },
        },
      } = router;
      return {
        boards,
      };
    }),
    exhaustMap(payload => {
      return this.boardService.getPlansFromParams(payload.boards).pipe(
        map((plans: Plan[]) => new backlogActions.GetPlansSuccess(plans)),
        catchError(err => of(new backlogActions.GetPlansError(err))),
      );
    }),
  );

  @Effect()
  loadPlans = this.actions$.pipe(
    ofType(backlogActions.BacklogActionTypes.ADD_PLANS),
    withLatestFrom(this.store.select(fromBacklog.getBoards), (action: { payload: string }, plans: Plan[]) => ({
      plansToAdd: action.payload,
      currentlyLoadedPlans: plans,
    })),
    mergeMap(payload =>
      this.boardService
        .getPlansFromParams(payload.plansToAdd)
        .pipe(map((plansReturnFromServer: Plan[]) => new backlogActions.GetPlansSuccess(plansReturnFromServer))),
    ),
  );

  @Effect()
  removePlan$ = this.actions$.pipe(
    ofType(backlogActions.BacklogActionTypes.REMOVE_PLAN),
    withLatestFrom(this.store.select(fromBacklog.getBoards), (action: { payload: { planId: number }; type: string }, plans: Plan[]) => {
      const {
        payload: { planId },
      } = action;
      return {
        plans: plans.filter(plan => plan.id !== planId),
        planToRemoveId: plans.filter(plan => plan.id === planId)[0].projectId,
      };
    }),
    mergeMap(payload => {
      const { plans, planToRemoveId } = payload;
      // TODO: add something for response unsuccessful
      // TODO: remove only if last project in plan
      return this.signalRService.invoke('LeaveProjectGroup', planToRemoveId).pipe(
        map(res => {
          console.log(res);
          return new backlogActions.GetPlansSuccess(plans);
        }),
      );
    }),
  );

  @Effect()
  reorderListsOnPlans$ = this.actions$.pipe(
    ofType(backlogActions.BacklogActionTypes.REORDER_LISTS),
    withLatestFrom(
      this.store.select(fromBacklog.getBoards),
      (action: { payload: { lists: List[]; projectId: number; planId: number } }, plans: Plan[]) => {
        const planForListReorder: Plan = find(
          plans,
          plan => plan.id === action.payload.planId && plan.projectId === action.payload.projectId,
        );
        return {
          lists: action.payload.lists,
          plan: planForListReorder,
        };
      },
    ),
    exhaustMap((payload: { lists: List[]; plan: Plan }) => {
      const { lists, plan } = payload;
      const listsIds: number[] = lists.map(list => list.id);

      return this.signalRService
        .invoke('ListReorder', listsIds, plan.projectId, plan.id)
        .pipe(map(() => new backlogActions.UpdateListsOrder({ lists, projectId: plan.projectId, planId: plan.id })));
    }),
  );
}
