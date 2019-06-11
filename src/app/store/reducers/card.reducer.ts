import { CardActionTypes, CardActions } from '../actions/card.actions';
import { Card } from '@app/models';
import { ElementRef } from '@angular/core';

export interface CardState {
  selectedCard: Card;
  selectedCardElement: ElementRef;
}

const initialState: CardState = {
  selectedCard: undefined,
  selectedCardElement: undefined,
};

export function reducer(state = initialState, action: CardActions): CardState {
  switch (action.type) {
    case CardActionTypes.CARD_SELECTED:
      return {
        ...state,
        selectedCard: action.payload.card,
        selectedCardElement: action.payload.element,
      };

    default:
      return state;
  }
}
