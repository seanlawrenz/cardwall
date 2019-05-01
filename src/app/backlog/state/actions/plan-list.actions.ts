import { Action } from '@ngrx/store';
import { List } from '@app/models';

export enum PlanListActionTypes {
  REORDER_LISTS = '[BACKLOG LISTS] REORDER LISTS ON PLANS',
  REORDER_LISTS_SUCCESS = '[BACKLOG LISTS] REORDER LISTS ON PLANS SUCCESS',
}

export class ReorderListsOnPlans implements Action {
  readonly type = PlanListActionTypes.REORDER_LISTS;
  constructor(public payload: { projectId: number; planId: number; lists: List[] }) {}
}

export class ReorderListsOnPlansSuccess implements Action {
  readonly type = PlanListActionTypes.REORDER_LISTS_SUCCESS;
}

export type PlanListActions = ReorderListsOnPlans | ReorderListsOnPlansSuccess;
