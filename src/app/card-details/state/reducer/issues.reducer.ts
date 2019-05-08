import { CardDetailsIssueTypes, CardDetailsIssueActions } from '../actions';
import { Issue, ErrorFromSignalR } from '@app/models';

export interface CardDetailsIssueState {
  issues: Issue[];
  loading: boolean;
  error: ErrorFromSignalR;
}

export const initialState: CardDetailsIssueState = {
  issues: [],
  loading: false,
  error: undefined,
};

export function reducer(state = initialState, actions: CardDetailsIssueActions): CardDetailsIssueState {
  switch (actions.type) {
    case CardDetailsIssueTypes.FETCH_ISSUES:
      return {
        ...state,
        loading: true,
      };

    case CardDetailsIssueTypes.FETCH_ISSUES_SUCCESS:
      return {
        ...state,
        loading: false,
        issues: actions.payload,
        error: undefined,
      };

    case CardDetailsIssueTypes.FETCH_ISSUES_ERROR:
      return {
        ...state,
        loading: false,
        error: actions.payload,
      };

    default:
      return state;
  }
}
