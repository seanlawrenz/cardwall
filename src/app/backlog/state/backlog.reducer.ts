import { BacklogActionTypes, BacklogActions } from './backlog.actions';
import { PlanIdentifier } from '@app/models';

export interface BacklogState {
  planList: PlanIdentifier[];
  error: string;
  boards: any;
}

export const BACKLOG_STATE: BacklogState = {
  planList: [],
  error: '',
  boards: [],
};

export const reducer = (state = BACKLOG_STATE, action: BacklogActions): BacklogState => {
  switch (action.type) {
    case BacklogActionTypes.GET_AVAILABLE_BOARDS_SUCCESS:
      return {
        ...state,
        planList: action.payload,
      };

    case BacklogActionTypes.GET_AVAILABLE_BOARDS_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case BacklogActionTypes.GET_BOARDS_SUCCESS:
      return {
        ...state,
        boards: action.payload,
      };

    default:
      return state;
  }
};
