import { Action } from '@ngrx/store';
import { Board, ErrorFromSignalR } from '@app/models';

export enum BoardActionTypes {
  GET_BOARD = '[CARDWALL] GET BOARD',
  GET_BOARD_SUCCESS = '[CARDWALL] GET BOARD SUCCESS',
  GET_BOARD_ERROR = '[CARDWALL] GET BOARD ERROR',
  EDIT_BOARD_NAME = '[CARDWALL] EDIT BOARD NAME',
  EDIT_BOARD_NAME_SUCCESS = '[CARDWALL] EDIT BOARD NAME SUCCESS',
  EDIT_BOARD_NAME_ERROR = '[CARDWALL] EDIT BOARD NAME ERROR',
}

export class GetBoard implements Action {
  readonly type = BoardActionTypes.GET_BOARD;
}

export class GetBoardSuccess implements Action {
  readonly type = BoardActionTypes.GET_BOARD_SUCCESS;
  constructor(public payload: Board) {}
}

export class GetBoardError implements Action {
  readonly type = BoardActionTypes.GET_BOARD_ERROR;
  constructor(public payload: ErrorFromSignalR) {}
}

export class EditBoardName implements Action {
  readonly type = BoardActionTypes.EDIT_BOARD_NAME;
  constructor(public payload: Board) {}
}

export class EditBoardNameSuccess implements Action {
  readonly type = BoardActionTypes.EDIT_BOARD_NAME_SUCCESS;
  constructor(public payload: { name: string; description: string }) {}
}

export class EditBoardNameError implements Action {
  readonly type = BoardActionTypes.EDIT_BOARD_NAME_ERROR;
  constructor(public payload: ErrorFromSignalR) {}
}

export type BoardActions = GetBoard | GetBoardSuccess | GetBoardError | EditBoardName | EditBoardNameSuccess | EditBoardNameError;
