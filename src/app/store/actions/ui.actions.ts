import { Action } from '@ngrx/store';

export enum UIActionTypes {
  EXPAND_ALL = '[UI] EXPAND ALL',
  COMPRESS_ALL = '[UI] COMPRESS ALL',
  SHOW_SPINNER = '[UI] SHOW SPINNER',
  HIDE_SPINNER = '[UI] HIDE SPINNER',
}

export class ExpandAllLists implements Action {
  readonly type = UIActionTypes.EXPAND_ALL;
}

export class CompressAllLists implements Action {
  readonly type = UIActionTypes.COMPRESS_ALL;
}

export class ShowSpinner implements Action {
  readonly type = UIActionTypes.SHOW_SPINNER;
}

export class HideSpinner implements Action {
  readonly type = UIActionTypes.HIDE_SPINNER;
}

export type UIActions = ExpandAllLists | CompressAllLists | ShowSpinner | HideSpinner;
