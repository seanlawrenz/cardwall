import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromPlanIdentifiers from './backlog.plan-indentifers.reducer';
import * as fromPlans from './plan.reducer';

export interface BacklogState {
  planIdentifiers: fromPlanIdentifiers.PlanIdentiferState;
  plans: fromPlans.PlanState;
}

export const reducers: ActionReducerMap<BacklogState> = {
  planIdentifiers: fromPlanIdentifiers.reducer,
  plans: fromPlans.reducer,
};

export const getBacklogState = createFeatureSelector<BacklogState>('backlog');
