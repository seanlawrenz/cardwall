import * as actions from '../actions/plan-identifiers.action';
import { PlanIdentifier } from '@app/models';

export interface PlanIdentiferState {
  planIdentifiers: PlanIdentifier[];
  error: string;
}

export const initialState: PlanIdentiferState = {
  planIdentifiers: [],
  error: '',
};

export function reducer(state = initialState, action: actions.PlanIdentifierActions): PlanIdentiferState {
  switch (action.type) {
    case actions.PlanIdentifiersActionTypes.GET_AVAILABLE_PLAN_IDENTIFERS_SUCCESS:
      return {
        ...state,
        planIdentifiers: action.payload,
        error: '',
      };

    case actions.PlanIdentifiersActionTypes.GET_AVAILABLE_PLAN_IDENTIFERS_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
}
