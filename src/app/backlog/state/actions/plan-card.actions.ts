import { Action } from '@ngrx/store';
import { Card, List } from '@app/models';

export enum BacklogCardActionTypes {
  CARD_MOVE_SUCCESS = '[BACKLOG CARDS] CARD MOVE SUCCESS',
  MOVE_CARD = '[BACKLOG CARDS] MOVE CARD',
  DELETE_CARD = '[BACKLOG CARDS] DELETE CARD',
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

export type BacklogCardActions = CardMoveSuccess | MoveCard | DeleteCardOnBacklog;
