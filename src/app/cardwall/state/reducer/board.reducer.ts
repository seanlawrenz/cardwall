import { BoardActionTypes, BoardActions } from '../actions';
import { Board, ErrorFromSignalR } from '@app/models';

export interface BoardState {
  board: Board;
  loading: boolean;
  saving: boolean;
  error: ErrorFromSignalR;
}

export const initialState: BoardState = {
  board: undefined,
  loading: true,
  saving: false,
  error: undefined,
};

export function reducer(state = initialState, action: BoardActions): BoardState {
  switch (action.type) {
    case BoardActionTypes.GET_BOARD:
      return {
        ...state,
        loading: true,
      };

    case BoardActionTypes.GET_BOARD_SUCCESS:
      return {
        ...state,
        loading: false,
        board: action.payload,
        error: undefined,
      };

    case BoardActionTypes.GET_BOARD_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case BoardActionTypes.EDIT_BOARD_NAME:
      return {
        ...state,
        saving: true,
      };

    case BoardActionTypes.EDIT_BOARD_NAME_SUCCESS:
      return {
        ...state,
        board: { ...state.board, name: action.payload.name, description: action.payload.description },
        saving: false,
        error: undefined,
      };

    case BoardActionTypes.EDIT_BOARD_NAME_ERROR:
      return {
        ...state,
        saving: false,
        error: action.payload,
      };

    default:
      return state;
  }
}
