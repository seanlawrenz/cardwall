import { UIActionTypes, UIActions } from '../actions/ui.actions';

export interface UIState {
  expandLists: boolean;
  expandBoards: boolean;
  showSpinner: boolean;
  showOptions: boolean;
  showSlider: boolean;
}

export const UI_STATE: UIState = {
  expandLists: true,
  expandBoards: true,
  showSpinner: false,
  showOptions: false,
  showSlider: false,
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

    case UIActionTypes.SHOW_OPTIONS:
      return {
        ...state,
        showOptions: true,
      };

    case UIActionTypes.HIDE_OPTIONS:
      return {
        ...state,
        showOptions: false,
      };

    case UIActionTypes.SHOW_SLIDER:
      return {
        ...state,
        showSlider: true,
      };

    case UIActionTypes.HIDE_SLIDER:
      return {
        ...state,
        showSlider: false,
      };

    default:
      return state;
  }
}
