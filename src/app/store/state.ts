import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { RouterStateUrl } from './utils/custom-route-serializer';

// App Root State and reducer
export interface State {
  router: RouterReducerState<RouterStateUrl>;
}

export const reducers: ActionReducerMap<State> = {
  router: routerReducer,
};

// Router selector
export const getRouterState = createFeatureSelector<RouterReducerState<RouterStateUrl>>('router');
