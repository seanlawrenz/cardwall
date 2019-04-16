import { Action } from '@ngrx/store';
import { Card, List } from '@app/models';

export enum BacklogCardActionTypes {
  CARD_MOVE_SUCCESS = '[BACKLOG CARDS] CARD MOVE SUCCESS',
  MOVE_CARD = '[BACKLOG CARDS] MOVE CARD',
  DELETE_CARD = '[BACKLOG CARDS] DELETE CARD',
  ARCHIVE_CARD = '[BACKLOG CARDS] ARCHIVE CARD',
  ARCHIVE_CARD_SUCCESS = '[BACKLOG CARDS] ARCHIVE CARD SUCCESS',
  ARCHIVE_CARD_ERROR = '[BACKLOG CARDS] ARCHIVE CARD ERROR',
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

export class ArchiveCard implements Action {
  readonly type = BacklogCardActionTypes.ARCHIVE_CARD;
  constructor(public payload: { card: Card; useRemainingHours: boolean; originalCard: Card }) {}
}

export class ArchiveCardSuccess implements Action {
  readonly type = BacklogCardActionTypes.ARCHIVE_CARD_SUCCESS;
  // Returns the original card unarchived card
  constructor(public payload: Card) {}
}

export class ArchiveCardError implements Action {
  readonly type = BacklogCardActionTypes.ARCHIVE_CARD_ERROR;
  constructor(public payload: string) {}
}

export type BacklogCardActions = CardMoveSuccess | MoveCard | DeleteCardOnBacklog | ArchiveCard | ArchiveCardSuccess | ArchiveCardError;
