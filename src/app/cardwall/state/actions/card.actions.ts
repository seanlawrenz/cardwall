import { Action } from '@ngrx/store';
import { Board, Card, ErrorFromSignalR, List } from '@app/models';

export enum CardwallCardActionTypes {
  FETCH_CARD = '[CARDWALL] FETCH CARD',
  CARD_MOVEMENT_SAVING = '[CARDWALL CARD] CARD MOVEMENT SAVING',
  CARD_MOVEMENT_END = '[CARDWALL CARD] CARD MOVEMENT END',
  CARD_MOVE_TO_NEW_LIST = '[CARDWALL CARD] CARD MOVE TO NEW LIST',
  CARD_MOVE_TO_NEW_LIST_SUCCESS = '[CARDWALL CARD] CARD MOVE TO NEW LIST SUCCESS',
  DELETE_ALL_CARDS = '[CARDS] DELETE ALL CARDS',
  DELETE_ALL_CARDS_SUCCESS = '[CARDS] DELETE ALL CARDS SUCCESS',
  DELETE_ALL_CARDS_ERROR = '[CARDS] DELETE ALL CARDS ERROR',
}

export class FetchCard implements Action {
  readonly type = CardwallCardActionTypes.FETCH_CARD;
  constructor(public payload: Board) {}
}

export class CardMovementSave implements Action {
  readonly type = CardwallCardActionTypes.CARD_MOVEMENT_SAVING;
}

export class CardMovementEnd implements Action {
  readonly type = CardwallCardActionTypes.CARD_MOVEMENT_END;
}

export class CardMoveToNewList implements Action {
  readonly type = CardwallCardActionTypes.CARD_MOVE_TO_NEW_LIST;
  constructor(public payload: { card: Card; listId: number; newIndex: number }) {}
}

export class CardMoveToNewListSuccess implements Action {
  readonly type = CardwallCardActionTypes.CARD_MOVE_TO_NEW_LIST_SUCCESS;
}

export class DeleteAllCards implements Action {
  readonly type = CardwallCardActionTypes.DELETE_ALL_CARDS;
  constructor(public payload: List) {}
}

export class DeleteAllCardsSuccess implements Action {
  readonly type = CardwallCardActionTypes.DELETE_ALL_CARDS_SUCCESS;
}

export class DeleteAllCardsError implements Action {
  readonly type = CardwallCardActionTypes.DELETE_ALL_CARDS_ERROR;
  constructor(public payload: ErrorFromSignalR) {}
}

export type CardwallCardActions =
  | FetchCard
  | CardMovementSave
  | CardMovementEnd
  | CardMoveToNewList
  | CardMoveToNewListSuccess
  | DeleteAllCards
  | DeleteAllCardsSuccess
  | DeleteAllCardsError;
