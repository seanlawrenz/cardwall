import { BoardActionTypes, BoardActions, CardwallUIActions, CardwallUIActionTypes } from '../actions';
import { BrowserNotificationPreferences } from '@app/models';

export interface CardwallUIState {
  saving: boolean;
  showInactiveLists: boolean;
  showArchivedCards: boolean;
  notificationPreference: BrowserNotificationPreferences;
  showResources: boolean;
  showTotals: boolean;
  showFeed: boolean;
}

export const initialState: CardwallUIState = {
  saving: false,
  showInactiveLists: false,
  showArchivedCards: false,
  notificationPreference: undefined,
  showResources: false,
  showTotals: false,
  showFeed: false,
};

export function reducer(state = initialState, action: BoardActions | CardwallUIActions): CardwallUIState {
  const storage: Storage = window.localStorage;
  switch (action.type) {
    case BoardActionTypes.EDIT_BOARD_NAME:
      return {
        ...state,
        saving: true,
      };

    case BoardActionTypes.EDIT_BOARD_NAME_SUCCESS:
      return {
        ...state,
        saving: false,
      };

    case BoardActionTypes.EDIT_BOARD_NAME_ERROR:
      return {
        ...state,
        saving: false,
      };

    case CardwallUIActionTypes.SHOW_INACTIVE_LISTS:
      storage.setItem('Agile.Settings.CardWall.ShowInactive', JSON.stringify(true));
      return {
        ...state,
        showInactiveLists: true,
      };

    case CardwallUIActionTypes.HIDE_INACTIVE_LISTS:
      storage.setItem('Agile.Settings.CardWall.ShowInactive', JSON.stringify(false));
      return {
        ...state,
        showInactiveLists: false,
      };

    case CardwallUIActionTypes.SHOW_ARCHIVED_CARDS:
      storage.setItem('Agile.Settings.CardWall.ShowArchived', JSON.stringify(true));
      return {
        ...state,
        showArchivedCards: true,
      };

    case CardwallUIActionTypes.HIDE_ARCHIVED_CARDS:
      storage.setItem('Agile.Settings.CardWall.ShowArchived', JSON.stringify(false));
      return {
        ...state,
        showArchivedCards: false,
      };

    case CardwallUIActionTypes.CHANGE_NOTIFICATION_TYPE:
      storage.setItem('Agile.Settings.CardWall.Notifications', JSON.stringify(action.payload));
      return {
        ...state,
        notificationPreference: action.payload,
      };

    case CardwallUIActionTypes.SHOW_RESOURCES:
      return {
        ...state,
        showResources: true,
        showTotals: false,
        showFeed: false,
      };

    case CardwallUIActionTypes.SHOW_TOTALS:
      return {
        ...state,
        showResources: false,
        showTotals: true,
        showFeed: false,
      };

    case CardwallUIActionTypes.SHOW_FEED:
      return {
        ...state,
        showResources: false,
        showTotals: false,
        showFeed: true,
      };

    case CardwallUIActionTypes.HIDE_TOOLBAR:
      return {
        ...state,
        showResources: false,
        showTotals: false,
        showFeed: false,
      };

    default:
      return state;
  }
}
