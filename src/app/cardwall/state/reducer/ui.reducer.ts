import { BoardActionTypes, BoardActions, CardwallUIActions, CardwallUIActionTypes } from '../actions';

export interface CardwallUIState {
  saving: boolean;
  showInactiveLists: boolean;
}

export const initialState: CardwallUIState = {
  saving: false,
  showInactiveLists: false,
};

export function reducer(state = initialState, action: BoardActions | CardwallUIActions): CardwallUIState {
  switch (action.type) {
    case BoardActionTypes.EDIT_BOARD_NAME:
      return {
        ...state,
        saving: true,
      };

    case BoardActionTypes.EDIT_BOARD_NAME_SUCCESS:
      return {
        ...state,
        saving: false,
      };

    case BoardActionTypes.EDIT_BOARD_NAME_ERROR:
      return {
        ...state,
        saving: false,
      };

    case CardwallUIActionTypes.SHOW_INACTIVE_LISTS:
      return {
        ...state,
        showInactiveLists: true,
      };

    case CardwallUIActionTypes.HIDE_INACTIVE_LISTS:
      return {
        ...state,
        showInactiveLists: false,
      };

    default:
      return state;
  }
}
