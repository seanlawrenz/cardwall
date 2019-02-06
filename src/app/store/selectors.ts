import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RouterReducerState } from '@ngrx/router-store';
import { RouterStateUrl } from './utils/custom-route-serializer';

import * as fromLoader from './reducers/loader.reducer';
import * as fromUI from './reducers/ui.reducer';

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
