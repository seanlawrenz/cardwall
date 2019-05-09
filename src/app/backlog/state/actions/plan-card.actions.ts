import { Action } from '@ngrx/store';
import { Card, List, CardOperationInfo } from '@app/models';

export enum BacklogCardActionTypes {
  CARD_MOVE_SUCCESS = '[BACKLOG CARDS] CARD MOVE SUCCESS',
  MOVE_CARD = '[BACKLOG CARDS] MOVE CARD',
  DELETE_CARD = '[BACKLOG CARDS] DELETE CARD',
  ADD_CARD = '[BACKLOG CARDS] ADD CARD',
  ADD_CARD_SUCCESS = '[BACKLOG CARDS] ADD CARD SUCCESS',
  ADD_CARD_ERROR = '[BACKLOG CARDS] ADD CARD ERROR',
}

export class CardMoveSuccess implements Action {
  readonly type = BacklogCardActionTypes.CARD_MOVE_SUCCESS;
}

export class MoveCard implements Action {
  readonly type = BacklogCardActionTypes.MOVE_CARD;
  constructor(public payload: { newList: List; card: Card; top: boolean }) {}
}

export class DeleteCardOnBacklog implements Action {
  readonly type = BacklogCardActionTypes.DELETE_CARD;
  constructor(public payload: Card) {}
}

export class AddCardToBacklog implements Action {
  readonly type = BacklogCardActionTypes.ADD_CARD;
  constructor(public payload: List) {}
}

export class AddCardToBacklogSuccess implements Action {
  readonly type = BacklogCardActionTypes.ADD_CARD_SUCCESS;
  constructor(public payload: CardOperationInfo) {}
}

export class AddCardToBacklogError implements Action {
  readonly type = BacklogCardActionTypes.ADD_CARD_ERROR;
  constructor(public payload: string) {}
}

export type BacklogCardActions =
  | CardMoveSuccess
  | MoveCard
  | DeleteCardOnBacklog
  | AddCardToBacklog
  | AddCardToBacklogSuccess
  | AddCardToBacklogError;
