import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { RouterStateUrl } from './utils/custom-route-serializer';

import * as fromLoader from './reducers/loader.reducer';

// App Root State and reducer
export interface State {
  router: RouterReducerState<RouterStateUrl>;
  loading: fromLoader.LoadingState;
}

export const reducers: ActionReducerMap<State> = {
  router: routerReducer,
  loading: fromLoader.reducer,
};

// Router selector
export const getRouterState = createFeatureSelector<RouterReducerState<RouterStateUrl>>('router');

// Loading selector
export const selectLoadingEntity = createFeatureSelector<fromLoader.LoadingState>('loading');

export const isLoading = createSelector(
  selectLoadingEntity,
  fromLoader.isLoading,
);
