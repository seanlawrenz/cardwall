import { Action } from '@ngrx/store';

export enum BacklogSettingActionTypes {
  SHOW_WIP_LIMITS = '[UI SETTINGS] SHOW WIP LIMITS',
  HIDE_WIP_LIMITS = '[UI SETTINGS] HIDE WIP LIMITS',
  SHOW_STORY_POINTS = '[UI SETTINGS] SHOW STORY POINTS',
  HIDE_STORY_POINTS = '[UI SETTINGS] HIDE STORY POINTS',
  SHOW_ESTIMATED_HOURS = '[UI SETTINGS] SHOW ESTIMATED HOURS',
  HIDE_ESTIMATED_HOURS = '[UI SETTINGS] HIDE ESTIMATED HOURS',
}

export class ShowWIPLimits implements Action {
  readonly type = BacklogSettingActionTypes.SHOW_WIP_LIMITS;
}

export class HideWIPLimits implements Action {
  readonly type = BacklogSettingActionTypes.HIDE_WIP_LIMITS;
}

export class ShowStoryPoints implements Action {
  readonly type = BacklogSettingActionTypes.SHOW_STORY_POINTS;
}

export class HideStoryPoints implements Action {
  readonly type = BacklogSettingActionTypes.HIDE_STORY_POINTS;
}

export class ShowEstimatedHours implements Action {
  readonly type = BacklogSettingActionTypes.SHOW_ESTIMATED_HOURS;
}

export class HideEstimatedHours implements Action {
  readonly type = BacklogSettingActionTypes.HIDE_ESTIMATED_HOURS;
}

export type BacklogSettingActions =
  | ShowWIPLimits
  | HideWIPLimits
  | ShowStoryPoints
  | HideStoryPoints
  | ShowEstimatedHours
  | HideEstimatedHours;
