import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromBacklogSettings from './backlog-settings.reducer';
import * as fromPlanIdentifiers from './backlog.plan-indentifers.reducer';
import * as fromPlans from './plan.reducer';

export interface BacklogState {
  planIdentifiers: fromPlanIdentifiers.PlanIdentiferState;
  plans: fromPlans.PlanState;
  settings: fromBacklogSettings.SettingsState;
}

export const reducers: ActionReducerMap<BacklogState> = {
  planIdentifiers: fromPlanIdentifiers.reducer,
  plans: fromPlans.reducer,
  settings: fromBacklogSettings.reducer,
};

export const getBacklogState = createFeatureSelector<BacklogState>('backlog');
