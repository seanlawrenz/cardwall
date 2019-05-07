import { CardDetailsCardActions, CardDetailsCardTypes } from '../actions';
import { Card, Board, Plan, ErrorFromSignalR } from '@app/models';

export interface CardDetailsCardState {
  card: Card;
  plan: Plan | Board;
  error: ErrorFromSignalR;
}

export const initialState: CardDetailsCardState = {
  card: undefined,
  plan: undefined,
  error: undefined,
};

export function reducer(state = initialState, actions: CardDetailsCardActions): CardDetailsCardState {
  switch (actions.type) {
    case CardDetailsCardTypes.CURRENT_CARD:
      return {
        ...state,
        card: actions.payload.card,
        plan: actions.payload.plan,
      };

    case CardDetailsCardTypes.MY_WORK_SUCCESS:
      return {
        ...state,
        plan: actions.payload,
      };

    case CardDetailsCardTypes.SAVE_CARD_SUCCESS:
      const card = actions.payload.id === state.card.id ? actions.payload : state.card;
      return {
        ...state,
        card,
        error: undefined,
      };

    case CardDetailsCardTypes.SAVE_CARD_ERROR:
      return {
        ...state,
        error: actions.payload,
      };

    default:
      return state;
  }
}
