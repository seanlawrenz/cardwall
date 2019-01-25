import { Action } from '@ngrx/store';
import { PlanIdentifier } from '@app/models';

export enum BacklogActionTypes {
  GET_AVAILABLE_BOARDS = '[BACKLOG] GET AVAILABLE BOARDS',
  GET_AVAILABLE_BOARDS_SUCCESS = '[BACKLOG] GET AVAILABLE BOARDS SUCCESS',
  GET_AVAILABLE_BOARDS_FAIL = '[BACKLOG] GET AVAILABLE BOARDS FAIL',
}

export class GetAvailableBoards implements Action {
  readonly type = BacklogActionTypes.GET_AVAILABLE_BOARDS;
}

export class GetAvailableBoardsSuccess implements Action {
  readonly type = BacklogActionTypes.GET_AVAILABLE_BOARDS_SUCCESS;
  constructor(public payload: PlanIdentifier[]) {}
}

export class GetAvailableBoardsFail implements Action {
  readonly type = BacklogActionTypes.GET_AVAILABLE_BOARDS_FAIL;
  constructor(public payload: string) {}
}

export type BacklogActions = GetAvailableBoards | GetAvailableBoardsSuccess | GetAvailableBoardsFail;
