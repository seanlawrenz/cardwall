import { Action } from '@ngrx/store';
import { Plan } from '@app/models';

export enum PlanActionTypes {
  GET_PLANS_IN_PARAMS = '[BACKLOG] GET PLANS IN PARAMS',
  GET_PLANS_SUCCESS = '[BACKLOG] GET PLANS SUCCESS',
  GET_PLANS_FAIL = '[BACKLOG] GET PLANS FAIL',
  ADD_PLANS = '[BACKLOG PLAN] ADD PLANS',
  REMOVE_PLAN = '[BACKLOG PLAN] REMOVE PLAN',
  REORDER_PLANS = '[BACKLOG PLANS] REORDER PLANS',
  SEARCH_PLANS = '[SEARCH] SEARCH PLANS',
}

export class GetPlansInParams implements Action {
  readonly type = PlanActionTypes.GET_PLANS_IN_PARAMS;
}

export class AddPlan implements Action {
  readonly type = PlanActionTypes.ADD_PLANS;
  constructor(public payload: string) {}
}

export class RemovePlan implements Action {
  readonly type = PlanActionTypes.REMOVE_PLAN;
  constructor(public payload: { planId: number }) {}
}

export class GetPlansSuccess implements Action {
  readonly type = PlanActionTypes.GET_PLANS_SUCCESS;
  constructor(public payload: Plan[]) {}
}

export class GetPlansError implements Action {
  readonly type = PlanActionTypes.GET_PLANS_FAIL;
  constructor(public payload: string) {}
}

export class ReorderPlans implements Action {
  readonly type = PlanActionTypes.REORDER_PLANS;
  constructor(public payload: Plan[]) {}
}

export class SearchPlans implements Action {
  readonly type = PlanActionTypes.SEARCH_PLANS;
  constructor(public payload: string) {}
}

export type PlanActions = GetPlansInParams | AddPlan | RemovePlan | GetPlansSuccess | GetPlansError | ReorderPlans | SearchPlans;
