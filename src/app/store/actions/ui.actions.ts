import { Action } from '@ngrx/store';

export enum UIActionTypes {
  EXPAND_ALL = '[UI] EXPAND ALL',
  COMPRESS_ALL = '[UI] COMPRESS ALL',
  SHOW_SPINNER = '[UI] SHOW SPINNER',
  HIDE_SPINNER = '[UI] HIDE SPINNER',
  SHOW_OPTIONS = '[UI] SHOW OPTIONS',
  HIDE_OPTIONS = '[UI] HIDE OPTIONS',
  SHOW_SLIDER = '[UI SLIDER] SHOW SLIDER',
  HIDE_SLIDER = '[UI SLIDER] HIDE SLIDER',
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

export class ShowOptions implements Action {
  readonly type = UIActionTypes.SHOW_OPTIONS;
}

export class HideOptions implements Action {
  readonly type = UIActionTypes.HIDE_OPTIONS;
}

export class ShowSlider implements Action {
  readonly type = UIActionTypes.SHOW_SLIDER;
}

export class HideSlider implements Action {
  readonly type = UIActionTypes.HIDE_SLIDER;
}

export type UIActions = ExpandAllLists | CompressAllLists | ShowSpinner | HideSpinner | ShowOptions | HideOptions | ShowSlider | HideSlider;
