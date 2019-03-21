import { Action } from '@ngrx/store';
import { Card, Plan, Board } from '@app/models';

export enum CardDetailsCardTypes {
  CURRENT_CARD = '[CARD DETAILS] CURRENT CARD',
}

export class CurrentCard implements Action {
  readonly type = CardDetailsCardTypes.CURRENT_CARD;
  constructor(public payload: { card: Card; plan: Plan | Board }) {}
}

export type CardDetailsCardActions = CurrentCard;
