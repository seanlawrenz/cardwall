import { BacklogSettingActionTypes, BacklogSettingActions } from '../actions';

export interface SettingsState {
  showWIPLimits: boolean;
  showStoryPoints: boolean;
  showEstimatedHours: boolean;
}

export const initialState: SettingsState = {
  showWIPLimits: true,
  showStoryPoints: true,
  showEstimatedHours: true,
};

export function reducer(state = initialState, action: BacklogSettingActions): SettingsState {
  const storage: Storage = window.localStorage;
  switch (action.type) {
    case BacklogSettingActionTypes.SHOW_WIP_LIMITS:
      storage.setItem('Agile.Settings.Backlog.ShowLimits', JSON.stringify(true));
      return {
        ...state,
        showWIPLimits: true,
      };

    case BacklogSettingActionTypes.HIDE_WIP_LIMITS:
      storage.setItem('Agile.Settings.Backlog.ShowLimits', JSON.stringify(false));
      return {
        ...state,
        showWIPLimits: false,
      };

    case BacklogSettingActionTypes.SHOW_STORY_POINTS:
      return {
        ...state,
        showStoryPoints: true,
      };

    case BacklogSettingActionTypes.HIDE_STORY_POINTS:
      return {
        ...state,
        showStoryPoints: false,
      };

    case BacklogSettingActionTypes.SHOW_ESTIMATED_HOURS:
      return {
        ...state,
        showEstimatedHours: true,
      };

    case BacklogSettingActionTypes.HIDE_ESTIMATED_HOURS:
      return {
        ...state,
        showEstimatedHours: false,
      };

    default:
      return state;
  }
}