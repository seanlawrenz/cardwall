import { Action } from '@ngrx/store';
import { List, ErrorFromSignalR } from '@app/models';

export enum CardwallListActionTypes {
  REORDER_LISTS = '[CARDWALL LISTS] REORDER LISTS',
  REORDER_LISTS_SUCCESS = '[CARDWALL LISTS] REORDER LISTS SUCCESS',
  REORDER_LISTS_ERROR = '[CARDWALL LISTS] REORDER LISTS ERROR',
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

export type CardwallListActions = ReorderLists | ReorderListsSuccess | ReorderListsError;
