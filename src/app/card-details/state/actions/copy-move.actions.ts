import { Action } from '@ngrx/store';
import { Project, Plan, List } from '@app/models';

export enum CopyMoveCardTypes {
  GET_PROJECTS = '[COPY MOVE CARD] GET PROJECTS',
  GET_PROJECTS_SUCCESS = '[COPY MOVE CARD] GET PROJECTS SUCCESS',
  GET_PROJECTS_ERROR = '[COPY MOVE CARD] GET PROJECTS ERROR',
  GET_PLANS = '[COPY MOVE CARD] GET PLANS',
  GET_PLANS_SUCCESS = '[COPY MOVE CARD] GET PLANS SUCCESS',
  GET_PLANS_ERROR = '[COPY MOVE CARD] GET PLANS ERROR',
  GET_LISTS = '[COPY MOVE CARD] LISTS',
  GET_LISTS_SUCCESS = '[COPY MOVE CARD] LISTS SUCCESS',
  GET_LISTS_ERROR = '[COPY MOVE CARD] LISTS ERROR',
}

export class GetProjects implements Action {
  readonly type = CopyMoveCardTypes.GET_PROJECTS;
  constructor(public payload: { isTemplate: boolean }) {}
}

export class GetProjectSuccess implements Action {
  readonly type = CopyMoveCardTypes.GET_PROJECTS_SUCCESS;
  constructor(public payload: Project[]) {}
}

export class GetProjectsError implements Action {
  readonly type = CopyMoveCardTypes.GET_PROJECTS_ERROR;
  constructor(public payload: string) {}
}

export class GetPlans implements Action {
  readonly type = CopyMoveCardTypes.GET_PLANS;
  constructor(public payload: { projectID: number }) {}
}

export class GetPlansSuccess implements Action {
  readonly type = CopyMoveCardTypes.GET_PLANS_SUCCESS;
  constructor(public payload: Plan[]) {}
}

export class GetPlansError implements Action {
  readonly type = CopyMoveCardTypes.GET_PLANS_ERROR;
  constructor(public payload: string) {}
}

export class GetLists implements Action {
  readonly type = CopyMoveCardTypes.GET_LISTS;
  constructor(public payload: { projectId: number; planId: number }) {}
}

export class GetListsSuccess implements Action {
  readonly type = CopyMoveCardTypes.GET_LISTS_SUCCESS;
  constructor(public payload: List[]) {}
}
export class GetListsError implements Action {
  readonly type = CopyMoveCardTypes.GET_LISTS_ERROR;
  constructor(public payload: string) {}
}

export type CopyMoveCardActions =
  | GetProjects
  | GetProjectSuccess
  | GetProjectsError
  | GetPlans
  | GetPlansSuccess
  | GetPlansError
  | GetLists
  | GetListsSuccess
  | GetListsError;
