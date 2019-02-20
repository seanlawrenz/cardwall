import { BacklogActionTypes, BacklogActions } from './backlog.actions';
import { PlanIdentifier, Plan, List, Card } from '@app/models';

import { updateDataOnCollection, updateCardOrderInListInBacklog, updateCardInBacklog } from '@app/utils';
import { CardActionTypes, CardActions } from '@app/store/actions/card.actions';

export interface BacklogState {
  planList: PlanIdentifier[];
  error: string;
  plans: Plan[];
  plansLoading: boolean;
}

export const BACKLOG_STATE: BacklogState = {
  planList: [],
  error: '',
  plans: [],
  plansLoading: false,
};

export function reducer(state = BACKLOG_STATE, action: BacklogActions | CardActions): BacklogState {
  switch (action.type) {
    case BacklogActionTypes.GET_AVAILABLE_PLAN_IDENTIFERS_SUCCESS:
      return {
        ...state,
        planList: action.payload,
      };

    case BacklogActionTypes.GET_AVAILABLE_PLAN_IDENTIFERS_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case BacklogActionTypes.GET_PLANS_IN_PARAMS:
      return {
        ...state,
        plansLoading: true,
      };

    case BacklogActionTypes.GET_PLANS_SUCCESS:
      return {
        ...state,
        plans: action.payload,
        error: '',
        plansLoading: false,
      };

    case BacklogActionTypes.GET_PLANS_FAIL:
      return {
        ...state,
        error: action.payload,
        plansLoading: false,
      };

    case BacklogActionTypes.REORDER_PLANS:
      return {
        ...state,
        plans: action.payload,
      };

    case BacklogActionTypes.UPDATE_LISTS_ORDER:
      const {
        payload: { lists, planId },
      } = action;
      const planOnStateWithUpdatedData = updateDataOnCollection(state.plans, planId, lists);
      const plans = state.plans.map(plan => (plan.id === planOnStateWithUpdatedData.id ? planOnStateWithUpdatedData : plan));
      return {
        ...state,
        plans,
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

    default:
      return state;
  }
}
