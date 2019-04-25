import { Action } from '@ngrx/store';
import { Card, Subtask } from '@app/models';

export enum CardDetailsSubtasksTypes {
  FETCH_SUBTASKS = '[CARD DETAILS] FETCH SUBTASKS',
  FETCH_SUBTASKS_SUCCESS = '[CARD DETAILS] FETCH SUBTASKS SUCCESS',
  FETCH_SUBTASKS_ERROR = '[CARD DETAILS] FETCH SUBTASKS ERROR',
}

export class FetchSubtasks implements Action {
  readonly type = CardDetailsSubtasksTypes.FETCH_SUBTASKS;
  constructor(public payload: Card) {}
}

export class FetchSubtasksSuccess implements Action {
  readonly type = CardDetailsSubtasksTypes.FETCH_SUBTASKS_SUCCESS;
  constructor(public payload: Subtask[]) {}
}
export class FetchSubtasksError implements Action {
  readonly type = CardDetailsSubtasksTypes.FETCH_SUBTASKS_ERROR;
  constructor(public payload: string) {}
}

export type CardDetailsSubtasksActions = FetchSubtasks | FetchSubtasksSuccess | FetchSubtasksError;
