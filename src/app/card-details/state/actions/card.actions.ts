import { Action } from '@ngrx/store';
import { Card } from '@app/models';

export enum CardDetailsCardTypes {
  CURRENT_CARD = '[CARD DETAILS] CURRENT CARD',
}

export class CurrentCard implements Action {
  readonly type = CardDetailsCardTypes.CURRENT_CARD;
  constructor(public payload: Card) {}
}

export type CardDetailsCardActions = CurrentCard;
