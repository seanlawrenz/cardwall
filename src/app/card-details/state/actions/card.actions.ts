import { Action } from '@ngrx/store';
import { Card, Plan, Board } from '@app/models';

export enum CardDetailsCardTypes {
  CURRENT_CARD = '[CARD DETAILS] CURRENT CARD',
  ADD_TO_MY_WORK = '[CARD DETAILS] ADD TO MY WORK',
  REMOVE_FROM_MY_WORK = '[CARD DETAILS] REMOVE FROM MY WORK',
  MY_WORK_SUCCESS = '[CARD DETAILS] MY WORK SUCCESS',
  MY_WORK_ERROR = '[CARD DETAILS] MY WORK ERROR',
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

export type CardDetailsCardActions = CurrentCard | AddToMyWork | RemoveFromMyWork | MyWorkSuccess | MyWorkError;
