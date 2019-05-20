import { Action } from '@ngrx/store';
import { List, ErrorFromSignalR } from '@app/models';

export enum CardwallListActionTypes {
  REORDER_LISTS = '[CARDWALL LISTS] REORDER LISTS',
  REORDER_LISTS_SUCCESS = '[CARDWALL LISTS] REORDER LISTS SUCCESS',
  REORDER_LISTS_ERROR = '[CARDWALL LISTS] REORDER LISTS ERROR',
  EDIT_LIST = '[CARDWALL LISTS] EDIT LIST',
  EDIT_LIST_SUCCESS = '[CARDWALL LISTS] EDIT LIST SUCCESS',
  EDIT_LIST_ERROR = '[CARDWALL LISTS] EDIT LIST ERROR',
  ADD_LIST = '[CARDWALL LISTS] ADD LIST',
  ADD_LIST_SUCCESS = '[CARDWALL LISTS] ADD LIST SUCCESS',
  ADD_LIST_ERROR = '[CARDWALL LISTS] ADD LIST ERROR',
}

export class ReorderLists implements Action {
  readonly type = CardwallListActionTypes.REORDER_LISTS;
  constructor(public payload: { lists: List[]; resortedList: List }) {}
}

export class ReorderListsSuccess implements Action {
  readonly type = CardwallListActionTypes.REORDER_LISTS_SUCCESS;
}

export class ReorderListsError implements Action {
  readonly type = CardwallListActionTypes.REORDER_LISTS_ERROR;
  constructor(public payload: ErrorFromSignalR) {}
}

export class EditList implements Action {
  readonly type = CardwallListActionTypes.EDIT_LIST;
  constructor(public payload: List) {}
}

export class EditListSuccess implements Action {
  readonly type = CardwallListActionTypes.EDIT_LIST_SUCCESS;
  constructor(public payload: List) {}
}

export class EditListError implements Action {
  readonly type = CardwallListActionTypes.EDIT_LIST_ERROR;
  constructor(public payload: ErrorFromSignalR) {}
}

export class AddList implements Action {
  readonly type = CardwallListActionTypes.ADD_LIST;
  constructor(public payload: List) {}
}

export class AddListSuccess implements Action {
  readonly type = CardwallListActionTypes.ADD_LIST_SUCCESS;
  constructor(public payload: List) {}
}

export class AddListError implements Action {
  readonly type = CardwallListActionTypes.ADD_LIST_ERROR;
  constructor(public payload: ErrorFromSignalR) {}
}

export type CardwallListActions =
  | ReorderLists
  | ReorderListsSuccess
  | ReorderListsError
  | EditList
  | EditListSuccess
  | EditListError
  | AddList
  | AddListSuccess
  | AddListError;
