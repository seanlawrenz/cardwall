import { Action } from '@ngrx/store';
import { Card, Subtask } from '@app/models';

export enum CardDetailsSubtasksTypes {
  FETCH_SUBTASKS = '[CARD DETAILS] FETCH SUBTASKS',
  FETCH_SUBTASKS_SUCCESS = '[CARD DETAILS] FETCH SUBTASKS SUCCESS',
  FETCH_SUBTASKS_ERROR = '[CARD DETAILS] FETCH SUBTASKS ERROR',
  UPDATE_SUBTASK = '[CARD DETAILS] UPDATE SUBTASK',
  UPDATE_SUBTASK_SUCCESS = '[CARD DETAILS] UPDATE SUBTASK SUCCESS',
  UPDATE_SUBTASK_ERROR = '[CARD DETAILS] UPDATE SUBTASK ERROR',
  SET_SUBTASKS_ORDER = '[CARD DETAILS] SET SUBTASKS ORDER',
  SET_SUBTASKS_ORDER_SUCCESS = '[CARD DETAILS] SET SUBTASKS ORDER SUCCESS',
  SET_SUBTASKS_ORDER_ERROR = '[CARD DETAILS] SET SUBTASKS ORDER SUCCESS ERROR',
  PROMOTE_SUBTASK = '[CARD DETAILS] PROMOTE SUBTASK',
  PROMOTE_SUBTASK_SUCCESS = '[CARD DETAILS] PROMOTE SUBTASK SUCCESS',
  PROMOTE_SUBTASK_ERROR = '[CARD DETAILS] PROMOTE SUBTASK ERROR',
  CREATE_SUBTASK = '[CARD DETAILS] CREATE SUBTASK',
  CREATE_SUBTASK_SUCCESS = '[CARD DETAILS] CREATE SUBTASK SUCCESS',
  CREATE_SUBTASK_ERROR = '[CARD DETAILS] CREATE SUBTASK ERROR',
  DELETE_SUBTASK = '[CARD DETAILS] DELETE SUBTASK',
  DELETE_SUBTASK_SUCCESS = '[CARD DETAILS] DELETE SUBTASK SUCCESS',
  DELETE_SUBTASK_ERROR = '[CARD DETAILS] DELETE SUBTASK ERROR',
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
  constructor(public payload: { message: string; reason: string }) {}
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
  constructor(public payload: { message: string; reason: string }) {}
}

export class SetSubtasksOrder implements Action {
  readonly type = CardDetailsSubtasksTypes.SET_SUBTASKS_ORDER;
  constructor(public payload: { card: Card; subtask: Subtask; newIndex: number }) {}
}

export class SetSubtasksOrderSuccess implements Action {
  readonly type = CardDetailsSubtasksTypes.SET_SUBTASKS_ORDER_SUCCESS;
}

export class SetSubtasksOrderError implements Action {
  readonly type = CardDetailsSubtasksTypes.SET_SUBTASKS_ORDER_ERROR;
  constructor(public payload: { message: string; reason: string }) {}
}

export class PromoteSubtask implements Action {
  readonly type = CardDetailsSubtasksTypes.PROMOTE_SUBTASK;
  constructor(public payload: { card: Card; subtask: Subtask }) {}
}

export class PromoteSubtaskSuccess implements Action {
  readonly type = CardDetailsSubtasksTypes.PROMOTE_SUBTASK_SUCCESS;
  constructor(public payload: Subtask) {}
}

export class PromoteSubtaskError implements Action {
  readonly type = CardDetailsSubtasksTypes.PROMOTE_SUBTASK_ERROR;
  constructor(public payload: { message: string; reason: string }) {}
}

export class CreateSubtask implements Action {
  readonly type = CardDetailsSubtasksTypes.CREATE_SUBTASK;
  constructor(public payload: { card: Card; subtask: Subtask }) {}
}

export class CreateSubtaskSuccess implements Action {
  readonly type = CardDetailsSubtasksTypes.CREATE_SUBTASK_SUCCESS;
  constructor(public payload: Subtask) {}
}

export class CreateSubtaskError implements Action {
  readonly type = CardDetailsSubtasksTypes.CREATE_SUBTASK_ERROR;
  constructor(public payload: { message: string; reason: string }) {}
}

export class DeleteSubtask implements Action {
  readonly type = CardDetailsSubtasksTypes.DELETE_SUBTASK;
  constructor(public payload: { card: Card; subtask: Subtask }) {}
}

export class DeleteSubtaskSuccess implements Action {
  readonly type = CardDetailsSubtasksTypes.DELETE_SUBTASK_SUCCESS;
  constructor(public payload: number) {}
}

export class DeleteSubtaskError implements Action {
  readonly type = CardDetailsSubtasksTypes.DELETE_SUBTASK_ERROR;
  constructor(public payload: { message: string; reason: string }) {}
}

export type CardDetailsSubtasksActions =
  | FetchSubtasks
  | FetchSubtasksSuccess
  | FetchSubtasksError
  | UpdateSubtask
  | UpdateSubtaskSuccess
  | UpdateSubtaskError
  | SetSubtasksOrder
  | SetSubtasksOrderSuccess
  | SetSubtasksOrderError
  | PromoteSubtask
  | PromoteSubtaskSuccess
  | PromoteSubtaskError
  | CreateSubtask
  | CreateSubtaskSuccess
  | CreateSubtaskError
  | DeleteSubtask
  | DeleteSubtaskSuccess
  | DeleteSubtaskError;
