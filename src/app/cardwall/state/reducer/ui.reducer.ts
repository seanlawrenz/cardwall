import { BoardActionTypes, BoardActions } from '../actions';

export interface CardwallUIState {
  saving: boolean;
}

export const initialState: CardwallUIState = {
  saving: false,
};

export function reducer(state = initialState, action: BoardActions): CardwallUIState {
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

    default:
      return state;
  }
}
