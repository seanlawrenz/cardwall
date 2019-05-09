import { Action } from '@ngrx/store';
import { Board, ErrorFromSignalR } from '@app/models';

export enum BoardActionTypes {
  GET_BOARD = '[CARDWALL] GET BOARD',
  GET_BOARD_SUCCESS = '[CARDWALL] GET BOARD SUCCESS',
  GET_BOARD_ERROR = '[CARDWALL] GET BOARD ERROR',
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

export type BoardActions = GetBoard | GetBoardSuccess | GetBoardError;
