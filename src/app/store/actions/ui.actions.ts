import { Action } from '@ngrx/store';

export enum UIActionTypes {
  EXPAND_ALL = '[UI] EXPAND ALL',
  COMPRESS_ALL = '[UI] COMPRESS ALL',
}

export class ExpandAllLists implements Action {
  readonly type = UIActionTypes.EXPAND_ALL;
}

export class CompressAllLists implements Action {
  readonly type = UIActionTypes.COMPRESS_ALL;
}

export type UIActions = ExpandAllLists | CompressAllLists;
