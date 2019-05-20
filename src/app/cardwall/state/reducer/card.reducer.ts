import { BoardActions, BoardActionTypes } from '../actions';
import { Card, ErrorFromSignalR } from '@app/models';

export interface CardState {
  cards: Card[];
  saving: boolean;
  error: ErrorFromSignalR;
}

export const initialState: CardState = {
  cards: [],
  saving: false,
  error: undefined,
};

export function reducer(state = initialState, action: BoardActions): CardState {
  switch (action.type) {
    case BoardActionTypes.GET_BOARD_SUCCESS:
      const initialCards: Card[] = [];
      action.payload.lists.map(list => list.cards.map(card => initialCards.push(card)));
      return {
        ...state,
        cards: initialCards,
      };

    default:
      return state;
  }
}
