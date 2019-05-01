import { Action } from '@ngrx/store';
import { Card, Subtask } from '@app/models';

export enum CardDetailsSubtasksTypes {
  FETCH_SUBTASKS = '[CARD DETAILS] FETCH SUBTASKS',
  FETCH_SUBTASKS_SUCCESS = '[CARD DETAILS] FETCH SUBTASKS SUCCESS',
  FETCH_SUBTASKS_ERROR = '[CARD DETAILS] FETCH SUBTASKS ERROR',
  UPDATE_SUBTASK = '[CARD DETAILS] UPDATE SUBTASK',
  UPDATE_SUBTASK_SUCCESS = '[CARD DETAILS] UPDATE SUBTASK SUCCESS',
  UPDATE_SUBTASK_ERROR = '[CARD DETAILS] UPDATE SUBTASK ERROR',
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

export class UpdateSubtask implements Action {
  readonly type = CardDetailsSubtasksTypes.UPDATE_SUBTASK;
  constructor(public payload: { subtask: Subtask; card: Card }) {}
}

export class UpdateSubtaskSuccess implements Action {
  readonly type = CardDetailsSubtasksTypes.UPDATE_SUBTASK_SUCCESS;
  constructor(public payload: Subtask) {}
}

export class UpdateSubtaskError implements Action {
  readonly type = CardDetailsSubtasksTypes.UPDATE_SUBTASK_ERROR;
  constructor(public payload: string) {}
}

export type CardDetailsSubtasksActions =
  | FetchSubtasks
  | FetchSubtasksSuccess
  | FetchSubtasksError
  | UpdateSubtask
  | UpdateSubtaskSuccess
  | UpdateSubtaskError;
