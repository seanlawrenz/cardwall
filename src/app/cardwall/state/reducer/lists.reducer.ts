import { BoardActions, BoardActionTypes, CardwallListActionTypes, CardwallListActions } from '../actions';
import { List, ErrorFromSignalR } from '@app/models';
import { updateListInBoard } from '@app/utils/listOperations';

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
        error: action.payload,
      };

    case CardwallListActionTypes.EDIT_LIST:
      return {
        ...state,
        saving: true,
      };

    case CardwallListActionTypes.EDIT_LIST_SUCCESS:
      return {
        ...state,
        lists: updateListInBoard(state.lists, action.payload),
        saving: false,
      };

    case CardwallListActionTypes.EDIT_LIST_ERROR:
      return {
        ...state,
        saving: false,
        error: action.payload,
      };

    default:
      return state;
  }
}
