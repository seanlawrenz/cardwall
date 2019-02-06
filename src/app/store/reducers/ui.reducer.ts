import { UIActionTypes, UIActions } from '../actions/ui.actions';

export interface UIState {
  expandLists: boolean;
}

export const UI_STATE: UIState = {
  expandLists: true,
};

export const reducer = (state = UI_STATE, action: UIActions): UIState => {
  switch (action.type) {
    case UIActionTypes.EXPAND_ALL_LISTS:
      return {
        ...state,
        expandLists: true,
      };

    case UIActionTypes.COMPRESS_ALL_LISTS:
      return {
        ...state,
        expandLists: false,
      };

    default:
      return state;
  }
};
