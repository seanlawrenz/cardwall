import { Action } from '@ngrx/store';
import { Board } from '@app/models';

export enum CardwallCardActionTypes {
  FETCH_CARD = '[CARDWALL] FETCH CARD',
  CARD_MOVEMENT_SAVING = '[CARDWALL CARD] CARD MOVEMENT SAVING',
  CARD_MOVEMENT_END = '[CARDWALL CARD] CARD MOVEMENT END',
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

export type CardwallCardActions = FetchCard | CardMovementSave | CardMovementEnd;
