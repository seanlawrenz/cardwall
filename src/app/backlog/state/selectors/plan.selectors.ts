import { createSelector } from '@ngrx/store';

import * as fromBacklog from '../reducer';
import { find } from 'lodash';

export const getPlans = createSelector(
  fromBacklog.getBacklogState,
  state => state.plans.plans,
);

export const getPlansError = createSelector(
  fromBacklog.getBacklogState,
  state => state.plans.error,
);

export const isPlansLoading = createSelector(
  fromBacklog.getBacklogState,
  state => state.plans.plansLoading,
);

export const getPlanById = planId =>
  createSelector(
    getPlans,
    plans => find(plans, plan => plan.id === planId),
  );

export const getListById = (planId, listId) =>
  createSelector(
    getPlanById(planId),
    plan => find(plan.lists, list => list.id === listId),
  );

export const getListsByPlan = planId =>
  createSelector(
    getPlanById(planId),
    plan => plan.lists,
  );
