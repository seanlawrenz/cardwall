import { Action } from '@ngrx/store';
import { ListReorderInfo } from '@app/models';

export enum ListActionTypes {
  LIST_REORDER = '[LISTS] LIST REORDER',
}

export class ListReorder implements Action {
  readonly type = ListActionTypes.LIST_REORDER;
  constructor(public payload: ListReorderInfo) {}
}

export type ListActions = ListReorder;
