import { CardDetailsUIActions, CardDetailsUITypes } from '../actions';

export interface CardDetailsUIState {
  showDetails: boolean;
}

export const initialState: CardDetailsUIState = {
  showDetails: false,
};

export function reducer(state = initialState, action: CardDetailsUIActions): CardDetailsUIState {
  switch (action.type) {
    case CardDetailsUITypes.SHOW_DETAILS:
      return {
        ...state,
        showDetails: true,
      };

    case CardDetailsUITypes.HIDE_DETAILS:
      return {
        ...state,
        showDetails: false,
      };

    default:
      return state;
  }
}
