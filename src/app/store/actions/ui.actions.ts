import { Action } from '@ngrx/store';

export enum UIActionTypes {
  EXPAND_ALL_LISTS = '[UI] EXPAND ALL LISTS',
  COMPRESS_ALL_LISTS = '[UI] COMPRESS ALL LISTS',
}

export class ExpandAllLists implements Action {
  readonly type = UIActionTypes.EXPAND_ALL_LISTS;
  constructor(public payload = true) {}
}

export class CompressAllLists implements Action {
  readonly type = UIActionTypes.COMPRESS_ALL_LISTS;
  constructor(public payload = true) {}
}

export type UIActions = ExpandAllLists | CompressAllLists;
