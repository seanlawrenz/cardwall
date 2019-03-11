import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import { fromRoot } from '@app/store';
import * as fromBacklogSettings from './backlog-settings.reducer';
import * as fromBacklogToolbar from './backlog-tools.reducer';
import * as fromPlanIdentifiers from './backlog.plan-indentifers.reducer';
import * as fromPlans from './plan.reducer';

export interface BacklogState {
  planIdentifiers: fromPlanIdentifiers.PlanIdentiferState;
  plans: fromPlans.PlanState;
  settings: fromBacklogSettings.SettingsState;
  toolbar: fromBacklogToolbar.BacklogToolbarState;
}

export interface State extends fromRoot.State {
  backlog: BacklogState;
}

export const reducers: ActionReducerMap<BacklogState> = {
  planIdentifiers: fromPlanIdentifiers.reducer,
  plans: fromPlans.reducer,
  settings: fromBacklogSettings.reducer,
  toolbar: fromBacklogToolbar.reducer,
};

export const getBacklogState = createFeatureSelector<BacklogState>('backlog');
