import { Action } from '@ngrx/store';

export enum BacklogCardActionTypes {
  CARD_MOVE_SUCCESS = '[BACKLOG CARDS] CARD MOVE SUCCESS',
}

export class CardMoveSuccess implements Action {
  readonly type = BacklogCardActionTypes.CARD_MOVE_SUCCESS;
}

export type BacklogCardActions = CardMoveSuccess;
