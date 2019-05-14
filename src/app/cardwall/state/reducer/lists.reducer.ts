import { BoardActions, BoardActionTypes } from '../actions';
import { List, ErrorFromSignalR } from '@app/models';

export interface ListState {
  lists: List[];
  error: ErrorFromSignalR;
}

export const initialState: ListState = {
  lists: [],
  error: undefined,
};

export function reducer(state = initialState, action: BoardActions): ListState {
  switch (action.type) {
    case BoardActionTypes.GET_BOARD_SUCCESS:
      return {
        ...state,
        lists: action.payload.lists,
      };

    default:
      return state;
  }
}
