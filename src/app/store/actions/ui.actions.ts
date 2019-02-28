import { Action } from '@ngrx/store';

export enum UIActionTypes {
  EXPAND_ALL = '[UI] EXPAND ALL',
  COMPRESS_ALL = '[UI] COMPRESS ALL',
  SHOW_SPINNER = '[UI] SHOW SPINNER',
  HIDE_SPINNER = '[UI] HIDE SPINNER',
  SHOW_WIP_LIMITS = '[UI SETTINGS] SHOW WIP LIMITS',
  HIDE_WIP_LIMITS = '[UI SETTINGS] HIDE WIP LIMITS',
  SHOW_STORY_POINTS = '[UI SETTINGS] SHOW STORY POINTS',
  HIDE_STORY_POINTS = '[UI SETTINGS] HIDE STORY POINTS',
  SHOW_ESTIMATED_HOURS = '[UI SETTINGS] SHOW ESTIMATED HOURS',
  HIDE_ESTIMATED_HOURS = '[UI SETTINGS] HIDE ESTIMATED HOURS',
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

export class ShowWIPLimits implements Action {
  readonly type = UIActionTypes.SHOW_WIP_LIMITS;
}

export class HideWIPLimits implements Action {
  readonly type = UIActionTypes.HIDE_WIP_LIMITS;
}

export class ShowStoryPoints implements Action {
  readonly type = UIActionTypes.SHOW_STORY_POINTS;
}

export class HideStoryPoints implements Action {
  readonly type = UIActionTypes.HIDE_STORY_POINTS;
}

export class ShowEstimatedHours implements Action {
  readonly type = UIActionTypes.SHOW_ESTIMATED_HOURS;
}

export class HideEstimatedHours implements Action {
  readonly type = UIActionTypes.HIDE_ESTIMATED_HOURS;
}

export type UIActions =
  | ExpandAllLists
  | CompressAllLists
  | ShowSpinner
  | HideSpinner
  | ShowWIPLimits
  | HideWIPLimits
  | ShowStoryPoints
  | HideStoryPoints
  | ShowEstimatedHours
  | HideEstimatedHours;
