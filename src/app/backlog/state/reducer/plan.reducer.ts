import { PlanActionTypes, PlanActions, PlanListActions, PlanListActionTypes } from '../actions';
import { Plan } from '@app/models';

import { updateDataOnCollection, updateCardOrderInListInBacklog, updateCardInBacklog } from '@app/utils';
import { CardActionTypes, CardActions } from '@app/store/actions/card.actions';

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

export function reducer(state = initialState, action: PlanActions | PlanListActions | CardActions): PlanState {
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

    default:
      return state;
  }
}
