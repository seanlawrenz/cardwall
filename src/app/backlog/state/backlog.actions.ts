import { Action } from '@ngrx/store';
import { PlanIdentifier, Board } from '@app/models';

export enum BacklogActionTypes {
  GET_AVAILABLE_BOARDS = '[BACKLOG] GET AVAILABLE BOARDS',
  GET_AVAILABLE_BOARDS_SUCCESS = '[BACKLOG] GET AVAILABLE BOARDS SUCCESS',
  GET_AVAILABLE_BOARDS_FAIL = '[BACKLOG] GET AVAILABLE BOARDS FAIL',
  GET_BOARDS_IN_PARAMS = 'GET_BOARDS_IN_PARAMS',
  GET_BOARDS = 'GET_BOARDS',
  GET_BOARDS_SUCCESS = 'GET_BOARDS_SUCCESS',
  GET_BOARDS_FAIL = 'GET_BOARDS_FAIL',
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

export class GetBoardsInParams implements Action {
  readonly type = BacklogActionTypes.GET_BOARDS_IN_PARAMS;
}

export class GetBoards implements Action {
  readonly type = BacklogActionTypes.GET_BOARDS;
  constructor(public payload: any) {}
}

export class GetBoardsSuccess implements Action {
  readonly type = BacklogActionTypes.GET_BOARDS_SUCCESS;
  constructor(public payload: Board[]) {}
}

export class GetBoardsError implements Action {
  readonly type = BacklogActionTypes.GET_BOARDS_FAIL;
  constructor(public payload: string) {}
}

export type BacklogActions =
  | GetAvailableBoards
  | GetAvailableBoardsSuccess
  | GetAvailableBoardsFail
  | GetBoardsInParams
  | GetBoardsSuccess
  | GetBoardsError;
