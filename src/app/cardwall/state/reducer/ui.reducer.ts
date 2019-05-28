import { BoardActionTypes, BoardActions, CardwallUIActions, CardwallUIActionTypes } from '../actions';

export interface CardwallUIState {
  saving: boolean;
  showInactiveLists: boolean;
  showArchivedCards: boolean;
}

export const initialState: CardwallUIState = {
  saving: false,
  showInactiveLists: false,
  showArchivedCards: false,
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

    default:
      return state;
  }
}
