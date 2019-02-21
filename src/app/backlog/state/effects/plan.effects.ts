import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { withLatestFrom, exhaustMap, map, catchError, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { SignalRService, BoardService } from '@app/app-services';
import { Plan, List } from '@app/models';

import { fromRoot } from '@app/store';
import * as planActions from '../actions';
import * as selectors from '../selectors/plan.selectors';
import { find } from 'lodash';

@Injectable()
export class PlanEffects {
  constructor(
    private actions$: Actions,
    private signalR: SignalRService,
    private boardService: BoardService,
    private store: Store<fromRoot.State>,
  ) {}

  @Effect()
  loadPlansOnParams$ = this.actions$.pipe(
    ofType(planActions.PlanActionTypes.GET_PLANS_IN_PARAMS),
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
    exhaustMap(payload =>
      this.boardService.getPlansFromParams(payload.boards).pipe(
        map((plans: Plan[]) => new planActions.GetPlansSuccess(plans)),
        catchError(err => of(new planActions.GetPlansError(err))),
      ),
    ),
  );

  @Effect()
  loadPlan$ = this.actions$.pipe(
    ofType(planActions.PlanActionTypes.ADD_PLANS),
    withLatestFrom(this.store.select(selectors.getPlans), (action: { payload: string }, plans: Plan[]) => ({
      plansToAdd: action.payload,
      currentlyLoadedPlans: plans,
    })),
    mergeMap(payload =>
      this.boardService
        .getPlansFromParams(payload.plansToAdd)
        .pipe(map((plansReturnFromServer: Plan[]) => new planActions.GetPlansSuccess(plansReturnFromServer))),
    ),
  );

  @Effect()
  removePlan$ = this.actions$.pipe(
    ofType(planActions.PlanActionTypes.REMOVE_PLAN),
    withLatestFrom(this.store.select(selectors.getPlans), (action: { payload: { planId: number }; type: string }, plans: Plan[]) => {
      const {
        payload: { planId },
      } = action;
      return {
        plans: plans.filter(plan => plan.id !== planId),
        planToRemoveProjectId: plans.filter(plan => plan.id === planId)[0].projectId,
      };
    }),
    mergeMap(payload => {
      const { plans, planToRemoveProjectId } = payload;

      // Need to remove from this project signalR group if this is last of it's projects;
      const listOfProjectIds = plans.map(plan => plan.projectId);
      const index = listOfProjectIds.indexOf(planToRemoveProjectId);
      if (index === -1) {
        // TODO: add something for response unsuccessful
        return this.signalR.invoke('LeaveProjectGroup', planToRemoveProjectId).pipe(map(() => new planActions.GetPlansSuccess(plans)));
      } else {
        return of(new planActions.GetPlansSuccess(plans));
      }
    }),
  );

  @Effect()
  reorderListsOnPlans$ = this.actions$.pipe(
    ofType(planActions.PlanListActionTypes.REORDER_LISTS),
    withLatestFrom(
      this.store.select(selectors.getPlans),
      (action: { payload: { lists: List[]; projectId: number; planId: number } }, plans: Plan[]) => {
        const planForListReorder = find(plans, plan => plan.id === action.payload.planId && plan.projectId === action.payload.projectId);
        return {
          lists: action.payload.lists,
          plan: planForListReorder,
        };
      },
    ),
    exhaustMap((payload: { lists: List[]; plan: Plan }) => {
      const { lists, plan } = payload;
      const listsIds: number[] = lists.map(list => list.id);

      return this.signalR
        .invoke('ListReorder', listsIds, plan.projectId, plan.id)
        .pipe(map(() => new planActions.UpdateListsOrder({ lists, projectId: plan.projectId, planId: plan.id })));
    }),
  );
}
