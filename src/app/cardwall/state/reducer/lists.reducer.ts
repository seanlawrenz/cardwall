import { BoardActions, BoardActionTypes, CardwallListActionTypes, CardwallListActions } from '../actions';
import { List, ErrorFromSignalR } from '@app/models';

export interface ListState {
  lists: List[];
  saving: boolean;
  error: ErrorFromSignalR;
}

export const initialState: ListState = {
  lists: [],
  saving: false,
  error: undefined,
};

export function reducer(state = initialState, action: BoardActions | CardwallListActions): ListState {
  switch (action.type) {
    case BoardActionTypes.GET_BOARD_SUCCESS:
      return {
        ...state,
        lists: action.payload.lists,
      };

    case CardwallListActionTypes.REORDER_LISTS:
      return {
        ...state,
        saving: true,
      };

    case CardwallListActionTypes.REORDER_LISTS_SUCCESS:
      return {
        ...state,
        saving: false,
      };

    case CardwallListActionTypes.REORDER_LISTS_ERROR:
      return {
        ...state,
        saving: false,
      };

    default:
      return state;
  }
}
