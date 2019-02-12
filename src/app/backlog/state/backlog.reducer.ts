import { BacklogActionTypes, BacklogActions } from './backlog.actions';
import { PlanIdentifier } from '@app/models';

import { find } from 'lodash';

export interface BacklogState {
  planList: PlanIdentifier[];
  error: string;
  plans: any;
  plansLoading: boolean;
}

export const BACKLOG_STATE: BacklogState = {
  planList: [],
  error: '',
  plans: [],
  plansLoading: false,
};

export function reducer(state = BACKLOG_STATE, action: BacklogActions): BacklogState {
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
        payload: { lists, projectId, planId },
      } = action;
      const planOnState = Object.assign({}, find(state.plans, plan => plan.id === planId && plan.projectId === projectId), lists);
      const plans = state.plans.map(plan => (plan.id === planOnState ? planOnState : plan));
      return {
        ...state,
        plans,
      };

    default:
      return state;
  }
}
