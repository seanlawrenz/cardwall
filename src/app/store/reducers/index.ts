import { ActionReducerMap } from '@ngrx/store';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { RouterStateUrl } from '../utils/custom-route-serializer';

import * as fromCard from './card.reducer';
import * as fromLoader from './loader.reducer';
import * as fromNotification from './notification.reducer';
import * as fromResource from './resource.reducer';
import * as fromUI from './ui.reducer';

export interface State {
  card: fromCard.CardState;
  loader: fromLoader.LoadingState;
  notifications: fromNotification.NotifyState;
  resource: fromResource.ResourceState;
  router: RouterReducerState<RouterStateUrl>;
  ui: fromUI.UIState;
}

export const reducers: ActionReducerMap<State> = {
  card: fromCard.reducer,
  loader: fromLoader.reducer,
  notifications: fromNotification.reducer,
  resource: fromResource.reducer,
  router: routerReducer,
  ui: fromUI.reducer,
};
