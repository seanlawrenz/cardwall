import {
  BoardActions,
  BoardActionTypes,
  CardwallListActionTypes,
  CardwallListActions,
  CardwallCardActionTypes,
  CardwallCardActions,
} from '../actions';
import { ListActionTypes, ListActions, CardActionTypes, CardActions } from '@app/store/actions';
import { List, ErrorFromSignalR } from '@app/models';
import { updateListInBoard, addListInBoard, updateListOrder } from '@app/utils/listOperations';
import {
  cardwallListReorder,
  updateCardInCardwall,
  createCardInCardwall,
  deleteCardInCardwall,
  bulkDeleteCardsInCardwall,
} from '@app/utils';

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

export function reducer(
  state = initialState,
  action: BoardActions | CardwallListActions | ListActions | CardActions | CardwallCardActions,
): ListState {
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

    case CardActionTypes.CARD_UPDATE_RECEIVED:
      return {
        ...state,
        lists: updateCardInCardwall(state.lists, action.payload),
      };

    case CardActionTypes.CARD_CREATE_FROM_SERVER:
      return {
        ...state,
        lists: createCardInCardwall(state.lists, action.payload),
      };

    case CardActionTypes.CARD_DELETE_FROM_SERVER:
      return {
        ...state,
        lists: deleteCardInCardwall(state.lists, action.payload),
      };

    case CardActionTypes.DELETE_CARD:
      return {
        ...state,
        saving: true,
      };

    case CardActionTypes.DELETE_CARD_SUCCESS:
      return {
        ...state,
        saving: false,
        lists: deleteCardInCardwall(state.lists, action.payload),
      };

    case CardActionTypes.DELETE_CARD_ERROR:
      return {
        ...state,
        saving: false,
        error: action.payload,
      };

    case CardwallCardActionTypes.DELETE_ALL_CARDS:
      return {
        ...state,
        saving: true,
      };

    case CardwallCardActionTypes.DELETE_ALL_CARDS_SUCCESS:
      return {
        ...state,
        saving: false,
        lists: bulkDeleteCardsInCardwall(state.lists),
      };

    case CardwallCardActionTypes.DELETE_ALL_CARDS_ERROR:
      return {
        ...state,
        saving: false,
        error: action.payload,
      };

    default:
      return state;
  }
}
