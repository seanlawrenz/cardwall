import { Action } from '@ngrx/store';
import { Board, Card } from '@app/models';

export enum CardwallCardActionTypes {
  FETCH_CARD = '[CARDWALL] FETCH CARD',
  CARD_MOVEMENT_SAVING = '[CARDWALL CARD] CARD MOVEMENT SAVING',
  CARD_MOVEMENT_END = '[CARDWALL CARD] CARD MOVEMENT END',
  CARD_MOVE_TO_NEW_LIST = '[CARDWALL CARD] CARD MOVE TO NEW LIST',
  CARD_MOVE_TO_NEW_LIST_SUCCESS = '[CARDWALL CARD] CARD MOVE TO NEW LIST SUCCESS',
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

export type CardwallCardActions = FetchCard | CardMovementSave | CardMovementEnd | CardMoveToNewList | CardMoveToNewListSuccess;
