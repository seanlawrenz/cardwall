import { PlanActionTypes, PlanActions, PlanListActions, BacklogCardActionTypes, BacklogCardActions } from '../actions';
import { Plan, Card, Resources, ErrorFromSignalR } from '@app/models';

import {
  updateCardOrderInListInBacklog,
  updateCardInBacklog,
  createCardInBacklog,
  deleteCardInBacklog,
  moveCardToTopOrBottomOfBacklog,
  archiveCardOnBacklog,
} from '@app/utils';
import { CardActionTypes, CardActions } from '@app/store/actions/card.actions';
import { ListActionTypes, ListActions } from '@app/store/actions/list.actions';
import { updateListOrderInBacklog } from '@app/utils/listOperations';

export interface PlanState {
  plans: Plan[];
  error: ErrorFromSignalR;
  plansLoading: boolean;
  selectedCard: Card;
  searchTerm: string | Resources[];
}

export const initialState: PlanState = {
  plans: [],
  error: undefined,
  plansLoading: false,
  selectedCard: undefined,
  searchTerm: '',
};

export function reducer(
  state = initialState,
  action: PlanActions | PlanListActions | BacklogCardActions | CardActions | ListActions,
): PlanState {
  switch (action.type) {
    case PlanActionTypes.GET_PLANS_IN_PARAMS:
      return {
        ...state,
        plansLoading: true,
      };

    case PlanActionTypes.ADD_PLANS:
      return {
        ...state,
        plansLoading: true,
      };

    case PlanActionTypes.GET_PLANS_SUCCESS:
      return {
        ...state,
        plans: action.payload,
        error: undefined,
        plansLoading: false,
      };

    case PlanActionTypes.GET_PLANS_FAIL:
      return {
        ...state,
        error: { message: 'Fail', reason: action.payload },
        plansLoading: false,
      };

    case PlanActionTypes.REORDER_PLANS:
      return {
        ...state,
        plans: action.payload,
      };

    case PlanActionTypes.SEARCH_PLANS:
      return {
        ...state,
        searchTerm: action.payload,
      };

    case BacklogCardActionTypes.MOVE_CARD:
      return {
        ...state,
        plans: moveCardToTopOrBottomOfBacklog(state.plans, action.payload.newList, action.payload.card, action.payload.top),
      };

    case BacklogCardActionTypes.DELETE_CARD:
      return {
        ...state,
        plans: deleteCardInBacklog(state.plans, action.payload),
      };

    case CardActionTypes.ARCHIVE_CARD_SUCCESS:
      return {
        ...state,
        plans: archiveCardOnBacklog(state.plans, action.payload),
      };

    case CardActionTypes.ARCHIVE_CARD_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    case BacklogCardActionTypes.ADD_CARD_SUCCESS:
      return {
        ...state,
        plans: createCardInBacklog(state.plans, action.payload),
      };

    case BacklogCardActionTypes.ADD_CARD_ERROR:
      return {
        ...state,
        error: { message: 'Cannot Add Card', reason: action.payload },
      };

    case ListActionTypes.LIST_REORDER:
      return {
        ...state,
        plans: updateListOrderInBacklog(state.plans, action.payload),
      };

    case CardActionTypes.CARD_REORDER_WITHIN_LIST:
      const {
        payload: { cardId, listId, index },
      } = action;

      return {
        ...state,
        plans: listId === 0 ? state.plans : updateCardOrderInListInBacklog(state.plans, listId, cardId, index),
      };

    case CardActionTypes.CARD_UPDATE_RECEIVED:
      return {
        ...state,
        plans: updateCardInBacklog(state.plans, action.payload),
      };

    case CardActionTypes.CARD_CREATE_FROM_SERVER:
      return {
        ...state,
        plans: createCardInBacklog(state.plans, action.payload),
      };

    case CardActionTypes.CARD_DELETE_FROM_SERVER:
      return {
        ...state,
        plans: deleteCardInBacklog(state.plans, action.payload),
      };

    default:
      return state;
  }
}
