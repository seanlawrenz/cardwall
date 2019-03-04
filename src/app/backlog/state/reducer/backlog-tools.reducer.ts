import { BacklogToolbarActionTypes, BacklogToolbarActions } from '../actions/backlog-toolbar.actions';

export interface BacklogToolbarState {
  showResources: boolean;
  showTotals: boolean;
  showFeed: boolean;
}

export const initialState: BacklogToolbarState = {
  showResources: false,
  showTotals: false,
  showFeed: false,
};

export function reducer(state = initialState, action: BacklogToolbarActions): BacklogToolbarState {
  switch (action.type) {
    case BacklogToolbarActionTypes.HIDE_TOOLBAR:
      return {
        ...state,
        showResources: false,
        showTotals: false,
        showFeed: false,
      };

    case BacklogToolbarActionTypes.SHOW_RESOURCES:
      return {
        ...state,
        showResources: true,
        showTotals: false,
        showFeed: false,
      };

    case BacklogToolbarActionTypes.SHOW_TOTALS:
      return {
        ...state,
        showResources: false,
        showTotals: true,
        showFeed: false,
      };

    case BacklogToolbarActionTypes.SHOW_FEED:
      return {
        ...state,
        showResources: false,
        showTotals: false,
        showFeed: true,
      };

    default:
      return state;
  }
}
