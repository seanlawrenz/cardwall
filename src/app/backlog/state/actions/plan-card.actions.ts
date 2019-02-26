import { Action } from '@ngrx/store';
import { Card } from '@app/models';

export enum BacklogCardActionTypes {
  CARD_MOVE_SUCCESS = '[BACKLOG CARDS] CARD MOVE SUCCESS',
  DELETE_CARD = '[BACKLOG CARDS] DELETE CARD',
}

export class CardMoveSuccess implements Action {
  readonly type = BacklogCardActionTypes.CARD_MOVE_SUCCESS;
}

export class DeleteCardOnBacklog implements Action {
  readonly type = BacklogCardActionTypes.DELETE_CARD;
  constructor(public payload: Card) {}
}

export type BacklogCardActions = CardMoveSuccess | DeleteCardOnBacklog;
