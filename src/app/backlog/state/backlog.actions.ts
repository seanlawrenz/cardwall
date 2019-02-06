import { Action } from '@ngrx/store';
import { PlanIdentifier, Board } from '@app/models';

export enum BacklogActionTypes {
  GET_AVAILABLE_BOARDS = '[BACKLOG] GET AVAILABLE BOARDS',
  GET_AVAILABLE_BOARDS_SUCCESS = '[BACKLOG] GET AVAILABLE BOARDS SUCCESS',
  GET_AVAILABLE_BOARDS_FAIL = '[BACKLOG] GET AVAILABLE BOARDS FAIL',
  GET_BOARDS_IN_PARAMS = '[BACKLOG] GET_BOARDS_IN_PARAMS',
  GET_BOARDS_SUCCESS = '[BACKLOG] GET_BOARDS_SUCCESS',
  GET_BOARDS_FAIL = '[BACKLOG] GET_BOARDS_FAIL',
  ADD_BOARD = '[BACKLOG] ADD BOARD',
  REMOVE_BOARD = '[BACKLOG] REMOVE BOARD',
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

export class AddBoard implements Action {
  readonly type = BacklogActionTypes.ADD_BOARD;
  constructor(public payload: string) {}
}

export class RemoveBoard implements Action {
  readonly type = BacklogActionTypes.REMOVE_BOARD;
  constructor(public payload: { planId: number }) {}
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
