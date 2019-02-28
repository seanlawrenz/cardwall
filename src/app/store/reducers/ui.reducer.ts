import { UIActionTypes, UIActions } from '../actions/ui.actions';

export interface UIState {
  expandLists: boolean;
  expandBoards: boolean;
  showSpinner: boolean;
  showWIPLimits: boolean;
  showStoryPoints: boolean;
  showEstimatedHours: boolean;
}

export const UI_STATE: UIState = {
  expandLists: true,
  expandBoards: true,
  showSpinner: false,
  showWIPLimits: true,
  showStoryPoints: true,
  showEstimatedHours: true,
};

export function reducer(state = UI_STATE, action: UIActions): UIState {
  switch (action.type) {
    case UIActionTypes.EXPAND_ALL:
      if (state.expandBoards === true) {
        return {
          ...state,
          expandLists: true,
        };
      } else {
        return {
          ...state,
          expandBoards: true,
        };
      }

    case UIActionTypes.COMPRESS_ALL:
      if (state.expandLists === true) {
        return {
          ...state,
          expandLists: false,
        };
      } else {
        return {
          ...state,
          expandBoards: false,
        };
      }

    case UIActionTypes.SHOW_SPINNER:
      return {
        ...state,
        showSpinner: true,
      };

    case UIActionTypes.HIDE_SPINNER:
      return {
        ...state,
        showSpinner: false,
      };

    case UIActionTypes.SHOW_WIP_LIMITS:
      return {
        ...state,
        showWIPLimits: true,
      };

    case UIActionTypes.HIDE_WIP_LIMITS:
      return {
        ...state,
        showEstimatedHours: false,
      };

    case UIActionTypes.SHOW_STORY_POINTS:
      return {
        ...state,
        showStoryPoints: true,
      };

    case UIActionTypes.HIDE_STORY_POINTS:
      return {
        ...state,
        showStoryPoints: false,
      };

    case UIActionTypes.SHOW_ESTIMATED_HOURS:
      return {
        ...state,
        showEstimatedHours: true,
      };

    case UIActionTypes.HIDE_ESTIMATED_HOURS:
      return {
        ...state,
        showEstimatedHours: false,
      };

    default:
      return state;
  }
}
