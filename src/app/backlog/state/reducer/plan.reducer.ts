import { PlanActionTypes, PlanActions, PlanListActions, PlanListActionTypes, BacklogCardActionTypes, BacklogCardActions } from '../actions';
import { Plan } from '@app/models';

import {
  updateDataOnCollection,
  updateCardOrderInListInBacklog,
  updateCardInBacklog,
  createCardInBacklog,
  deleteCardInBacklog,
} from '@app/utils';
import { CardActionTypes, CardActions } from '@app/store/actions/card.actions';
import { ListActionTypes, ListActions } from '@app/store/actions/list.actions';
import { getPlanById } from '../selectors';
import { updateListOrderInBacklog } from '@app/utils/listOperations';

export interface PlanState {
  plans: Plan[];
  error: string;
  plansLoading: boolean;
}

export const initialState: PlanState = {
  plans: [],
  error: '',
  plansLoading: false,
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

    case PlanActionTypes.GET_PLANS_SUCCESS:
      return {
        ...state,
        plans: action.payload,
        error: '',
        plansLoading: false,
      };

    case PlanActionTypes.GET_PLANS_FAIL:
      return {
        ...state,
        error: action.payload,
        plansLoading: false,
      };

    case PlanActionTypes.REORDER_PLANS:
      return {
        ...state,
        plans: action.payload,
      };

    case PlanListActionTypes.UPDATE_LISTS_ORDER:
      const planOnStateWithUpdatedData = updateDataOnCollection(state.plans, action.payload.planId, action.payload.lists);
      return {
        ...state,
        plans: state.plans.map(plan => (plan.id === planOnStateWithUpdatedData.id ? planOnStateWithUpdatedData : plan)),
      };

    case BacklogCardActionTypes.DELETE_CARD:
      return {
        ...state,
        plans: deleteCardInBacklog(state.plans, action.payload),
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
        plans: updateCardOrderInListInBacklog(state.plans, listId, cardId, index),
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
