import { CardDetailsCardActions, CardDetailsCardTypes } from '../actions';
import { Card, Board, Plan } from '@app/models';

export interface CardDetailsCardState {
  card: Card;
  plan: Plan | Board;
}

export const initialState: CardDetailsCardState = {
  card: undefined,
  plan: undefined,
};

export function reducer(state = initialState, actions: CardDetailsCardActions): CardDetailsCardState {
  switch (actions.type) {
    case CardDetailsCardTypes.CURRENT_CARD:
      return {
        ...state,
        card: actions.payload.card,
        plan: actions.payload.plan,
      };

    default:
      return state;
  }
}
