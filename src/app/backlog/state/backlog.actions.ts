import { Action } from '@ngrx/store';
import { PlanIdentifier, Plan, List } from '@app/models';

export enum BacklogActionTypes {
  GET_AVAILABLE_PLAN_IDENTIFERS = '[BACKLOG] GET AVAILABLE PLAN IDENTIFERS',
  GET_AVAILABLE_PLAN_IDENTIFERS_SUCCESS = '[BACKLOG] GET AVAILABLE PLAN IDENTIFERS SUCCESS',
  GET_AVAILABLE_PLAN_IDENTIFERS_FAIL = '[BACKLOG] GET AVAILABLE PLAN IDENTIFERS FAIL',
  GET_PLANS_IN_PARAMS = '[BACKLOG] GET PLANS IN PARAMS',
  GET_PLANS_SUCCESS = '[BACKLOG] GET PLANS SUCCESS',
  GET_PLANS_FAIL = '[BACKLOG] GET PLANS FAIL',
  ADD_PLANS = '[BACKLOG PLAN] ADD PLANS',
  REMOVE_PLAN = '[BACKLOG PLAN] REMOVE PLAN',
  REORDER_PLANS = '[BACKLOG PLANS] REORDER PLANS',
  REORDER_LISTS = '[BACKLOG LISTS] REORDER LISTS ON PLANS',
  UPDATE_LISTS_ORDER = '[BACKLOG LISTS] UPDATE LISTS ORDER',
}

export class GetAvailablePlans implements Action {
  readonly type = BacklogActionTypes.GET_AVAILABLE_PLAN_IDENTIFERS;
}

export class GetAvailablePlansSuccess implements Action {
  readonly type = BacklogActionTypes.GET_AVAILABLE_PLAN_IDENTIFERS_SUCCESS;
  constructor(public payload: PlanIdentifier[]) {}
}

export class GetAvailablePlansFail implements Action {
  readonly type = BacklogActionTypes.GET_AVAILABLE_PLAN_IDENTIFERS_FAIL;
  constructor(public payload: string) {}
}

export class GetPlansInParams implements Action {
  readonly type = BacklogActionTypes.GET_PLANS_IN_PARAMS;
}

export class AddBoard implements Action {
  readonly type = BacklogActionTypes.ADD_PLANS;
  constructor(public payload: string) {}
}

export class RemoveBoard implements Action {
  readonly type = BacklogActionTypes.REMOVE_PLAN;
  constructor(public payload: { planId: number }) {}
}

export class GetPlansSuccess implements Action {
  readonly type = BacklogActionTypes.GET_PLANS_SUCCESS;
  constructor(public payload: Plan[]) {}
}

export class GetPlansError implements Action {
  readonly type = BacklogActionTypes.GET_PLANS_FAIL;
  constructor(public payload: string) {}
}

export class ReorderPlans implements Action {
  readonly type = BacklogActionTypes.REORDER_PLANS;
  constructor(public payload: Plan[]) {}
}

export class ReorderListsOnPlans implements Action {
  readonly type = BacklogActionTypes.REORDER_LISTS;
  constructor(public payload: { lists: List[]; projectId: number; planId: number }) {}
}

export class UpdateListsOrder implements Action {
  readonly type = BacklogActionTypes.UPDATE_LISTS_ORDER;
  constructor(public payload: { lists: List[]; projectId: number; planId: number }) {}
}

export type BacklogActions =
  | GetAvailablePlans
  | GetAvailablePlansSuccess
  | GetAvailablePlansFail
  | GetPlansInParams
  | GetPlansSuccess
  | GetPlansError
  | ReorderPlans
  | AddBoard
  | RemoveBoard
  | ReorderListsOnPlans
  | UpdateListsOrder;
