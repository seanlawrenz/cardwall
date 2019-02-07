import { UIActionTypes, UIActions } from '../actions/ui.actions';

export interface UIState {
  expandLists: boolean;
  expandBoards: boolean;
  showSpinner: boolean;
}

export const UI_STATE: UIState = {
  expandLists: true,
  expandBoards: true,
  showSpinner: false,
};

export const reducer = (state = UI_STATE, action: UIActions): UIState => {
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

    default:
      return state;
  }
};
