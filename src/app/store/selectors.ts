import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RouterReducerState } from '@ngrx/router-store';
import { RouterStateUrl } from './utils/custom-route-serializer';

import * as fromLoader from './reducers/loader.reducer';
import * as fromUI from './reducers/ui.reducer';
import * as fromNotify from './reducers/notification.reducer';

// Router selector
export const getRouterState = createFeatureSelector<RouterReducerState<RouterStateUrl>>('router');

// Loading selector
export const selectLoadingEntity = createFeatureSelector<fromLoader.LoadingState>('loading');

export const isLoading = createSelector(
  selectLoadingEntity,
  fromLoader.isLoading,
);

// UI
export const getUIState = createFeatureSelector<fromUI.UIState>('ui');

export const isListsExpanded = createSelector(
  getUIState,
  state => state.expandLists,
);

export const isBoardsExpanded = createSelector(
  getUIState,
  state => state.expandBoards,
);

export const isSpinnerShowing = createSelector(
  getUIState,
  state => state.showSpinner,
);

export const showWIPLimits = createSelector(
  getUIState,
  state => state.showWIPLimits,
);
export const showStoryPoints = createSelector(
  getUIState,
  state => state.showStoryPoints,
);
export const showEstimatedHours = createSelector(
  getUIState,
  state => state.showEstimatedHours,
);

// Notifications
export const getNotificationState = createFeatureSelector<fromNotify.NotifyState>('notifications');

export const getNotifications = createSelector(
  getNotificationState,
  state => state.notifications,
);
