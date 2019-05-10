import { Action } from '@ngrx/store';
import { Board } from '@app/models';

export enum CardwallCardActionTypes {
  FETCH_CARD = '[CARDWALL] FETCH CARD',
}

export class FetchCard implements Action {
  readonly type = CardwallCardActionTypes.FETCH_CARD;
  constructor(public payload: Board) {}
}

export type CardwallCardActions = FetchCard;
