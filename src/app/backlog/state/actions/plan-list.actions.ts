import { Action } from '@ngrx/store';
import { List } from '@app/models';

export enum PlanListActionTypes {
  REORDER_LISTS = '[BACKLOG LISTS] REORDER LISTS ON PLANS',
  UPDATE_LISTS_ORDER = '[BACKLOG LISTS] UPDATE LISTS ORDER',
}

export class ReorderListsOnPlans implements Action {
  readonly type = PlanListActionTypes.REORDER_LISTS;
  constructor(public payload: { projectId: number; planId: number }) {}
}

export class UpdateListsOrder implements Action {
  readonly type = PlanListActionTypes.UPDATE_LISTS_ORDER;
  constructor(public payload: { lists: List[]; projectId: number; planId: number }) {}
}

export type PlanListActions = ReorderListsOnPlans | UpdateListsOrder;
