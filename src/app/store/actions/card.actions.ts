import { CardReorder, Card, CardRemovedFromListInfo, CardOperationInfo } from '@app/models';
import { Action } from '@ngrx/store';

export enum CardActionTypes {
  CARD_REORDER_WITHIN_LIST = '[CARDS] CARD REORDER WITHIN LIST',
  CARD_UPDATE_RECEIVED = '[CARDS] CARD UPDATE RECEIVED',
  CARD_REMOVED_FROM_LIST = '[CARDS] CARD REMOVED FROM LIST',
  CARD_CREATE_FROM_SERVER = '[CARDS] CARD CREATE FROM SERVER',
  CARD_DELETE_FROM_SERVER = '[CARDS] CARD DELETE FROM SERVER',
  CARD_SELECTED = '[CARD] CARD SELECTED',
}

export class CardReorderWithinList implements Action {
  readonly type = CardActionTypes.CARD_REORDER_WITHIN_LIST;
  constructor(public payload: CardReorder) {}
}

export class CardUpdateReceived implements Action {
  readonly type = CardActionTypes.CARD_UPDATE_RECEIVED;
  constructor(public payload: Card) {}
}

export class CardRemovedFromList implements Action {
  readonly type = CardActionTypes.CARD_REMOVED_FROM_LIST;
  constructor(public payload: CardRemovedFromListInfo) {}
}

export class CardCreateFromServer implements Action {
  readonly type = CardActionTypes.CARD_CREATE_FROM_SERVER;
  constructor(public payload: CardOperationInfo) {}
}

export class CardDeleteFromServer implements Action {
  readonly type = CardActionTypes.CARD_DELETE_FROM_SERVER;
  constructor(public payload: Card) {}
}

export class CardSelected implements Action {
  readonly type = CardActionTypes.CARD_SELECTED;
  constructor(public payload: Card) {}
}

export type CardActions =
  | CardReorderWithinList
  | CardUpdateReceived
  | CardRemovedFromList
  | CardCreateFromServer
  | CardDeleteFromServer
  | CardSelected;
