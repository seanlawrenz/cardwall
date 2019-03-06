import { CardActionTypes, CardActions } from '../actions/card.actions';
import { Card } from '@app/models';

export interface CardState {
  selectedCard: Card;
}

const initialState: CardState = {
  selectedCard: undefined,
};

export function reducer(state = initialState, action: CardActions): CardState {
  switch (action.type) {
    case CardActionTypes.CARD_SELECTED:
      return {
        ...state,
        selectedCard: action.payload,
      };

    default:
      return state;
  }
}
