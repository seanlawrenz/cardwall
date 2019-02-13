import { CardReorder } from '@app/models';
import { Action } from '@ngrx/store';

export enum CardActionTypes {
  CARD_REORDER_WITHIN_LIST = '[CARDS] CARD REORDER WITHIN LIST',
}

export class CardReorderWithinList implements Action {
  readonly type = CardActionTypes.CARD_REORDER_WITHIN_LIST;
  constructor(public payload: CardReorder) {}
}

export type CardActions = CardReorderWithinList;
