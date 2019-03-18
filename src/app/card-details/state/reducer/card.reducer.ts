import { CardDetailsCardActions, CardDetailsCardTypes } from '../actions';
import { Card } from '@app/models';

export interface CardDetailsCardState {
  card: Card;
}

export const initialState: CardDetailsCardState = {
  card: undefined,
};

export function reducer(state = initialState, actions: CardDetailsCardActions): CardDetailsCardState {
  switch (actions.type) {
    case CardDetailsCardTypes.CURRENT_CARD:
      return {
        ...state,
        card: actions.payload,
      };

    default:
      return state;
  }
}
