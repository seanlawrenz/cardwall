import { CardReorder, Card, CardRemovedFromListInfo } from '@app/models';
import { Action } from '@ngrx/store';

export enum CardActionTypes {
  CARD_REORDER_WITHIN_LIST = '[CARDS] CARD REORDER WITHIN LIST',
  CARD_UPDATE_RECEIVED = '[CARDS] CARD UPDATE RECEIVED',
  CARD_REMOVED_FROM_LIST = '[CARDS] CARD REMOVED FROM LIST',
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

export type CardActions = CardReorderWithinList | CardUpdateReceived | CardRemovedFromList;
