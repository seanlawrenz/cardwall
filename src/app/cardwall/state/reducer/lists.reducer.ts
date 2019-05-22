import { BoardActions, BoardActionTypes, CardwallListActionTypes, CardwallListActions } from '../actions';
import { ListActionTypes, ListActions, CardActionTypes, CardActions } from '@app/store/actions';
import { List, ErrorFromSignalR } from '@app/models';
import { updateListInBoard, addListInBoard, updateListOrder } from '@app/utils/listOperations';
import { cardwallListReorder } from '@app/utils';

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

export function reducer(state = initialState, action: BoardActions | CardwallListActions | ListActions | CardActions): ListState {
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

    case ListActionTypes.LIST_REORDER:
      return {
        ...state,
        lists: updateListOrder(state.lists, action.payload.sortedListIDs),
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

    case CardwallListActionTypes.ADD_LIST:
      return {
        ...state,
        saving: true,
      };

    case CardwallListActionTypes.ADD_LIST_SUCCESS:
      return {
        ...state,
        saving: false,
        lists: addListInBoard(state.lists, action.payload),
      };

    case CardwallListActionTypes.ADD_LIST_ERROR:
      return {
        ...state,
        saving: false,
        error: action.payload,
      };

    case CardActionTypes.CARD_REORDER_WITHIN_LIST:
      return {
        ...state,
        lists: cardwallListReorder(state.lists, action.payload),
      };

    default:
      return state;
  }
}
