import { ActionReducerMap } from '@ngrx/store';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { RouterStateUrl } from './utils/custom-route-serializer';

import * as fromLoader from './reducers/loader.reducer';
import * as fromUI from './reducers/ui.reducer';

// App Root State and reducer
export interface State {
  router: RouterReducerState<RouterStateUrl>;
  ui: fromUI.UIState;
  loading: fromLoader.LoadingState;
}

export const reducers: ActionReducerMap<State> = {
  router: routerReducer,
  ui: fromUI.reducer,
  loading: fromLoader.reducer,
};

// selectors
export * from './selectors';
