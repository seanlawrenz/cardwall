import { Action } from '@ngrx/store';
import { Card, Plan, Board, ErrorFromSignalR } from '@app/models';

export enum CardDetailsCardTypes {
  CURRENT_CARD = '[CARD DETAILS] CURRENT CARD',
  ADD_TO_MY_WORK = '[CARD DETAILS] ADD TO MY WORK',
  REMOVE_FROM_MY_WORK = '[CARD DETAILS] REMOVE FROM MY WORK',
  MY_WORK_SUCCESS = '[CARD DETAILS] MY WORK SUCCESS',
  MY_WORK_ERROR = '[CARD DETAILS] MY WORK ERROR',
  SAVE_CARD = '[CARD DETAILS] SAVE CARD',
  SAVE_CARD_SUCCESS = '[CARD DETAILS] SAVE CARD SUCCESS',
  SAVE_CARD_ERROR = '[CARD DETAILS] SAVE CARD ERROR',
}

export class CurrentCard implements Action {
  readonly type = CardDetailsCardTypes.CURRENT_CARD;
  constructor(public payload: { card: Card; plan: Plan | Board }) {}
}

export class AddToMyWork implements Action {
  readonly type = CardDetailsCardTypes.ADD_TO_MY_WORK;
  constructor(public payload: { card: Card; plan: Plan | Board }) {}
}

export class RemoveFromMyWork implements Action {
  readonly type = CardDetailsCardTypes.REMOVE_FROM_MY_WORK;
  constructor(public payload: { card: Card; plan: Plan | Board }) {}
}

export class MyWorkSuccess implements Action {
  readonly type = CardDetailsCardTypes.MY_WORK_SUCCESS;
  constructor(public payload: Plan | Board) {}
}

export class MyWorkError implements Action {
  readonly type = CardDetailsCardTypes.MY_WORK_ERROR;
  constructor(public payload: string) {}
}

export class SaveCard implements Action {
  readonly type = CardDetailsCardTypes.SAVE_CARD;
  constructor(public payload: { card: Card; useRemainingHours: boolean }) {}
}

export class SaveCardSuccess implements Action {
  readonly type = CardDetailsCardTypes.SAVE_CARD_SUCCESS;
  constructor(public payload: Card) {}
}
export class SaveCardError implements Action {
  readonly type = CardDetailsCardTypes.SAVE_CARD_ERROR;
  constructor(public payload: ErrorFromSignalR) {}
}

export type CardDetailsCardActions =
  | CurrentCard
  | AddToMyWork
  | RemoveFromMyWork
  | MyWorkSuccess
  | MyWorkError
  | SaveCard
  | SaveCardSuccess
  | SaveCardError;
