import { ActionReducerMap } from '@ngrx/store';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { RouterStateUrl } from './utils/custom-route-serializer';

import * as fromLoader from './reducers/loader.reducer';
import * as fromUI from './reducers/ui.reducer';
import * as fromNotify from './reducers/notification.reducer';

// App Root State and reducer
export interface State {
  router: RouterReducerState<RouterStateUrl>;
  ui: fromUI.UIState;
  loading: fromLoader.LoadingState;
  notifications: fromNotify.NotifyState;
}

export const reducers: ActionReducerMap<State> = {
  router: routerReducer,
  ui: fromUI.reducer,
  loading: fromLoader.reducer,
  notifications: fromNotify.reducer,
};

// selectors
export * from './selectors';
