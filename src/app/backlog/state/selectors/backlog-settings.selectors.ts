import { createSelector } from '@ngrx/store';

import * as fromBacklog from '../reducer';

export const showWIPLimits = createSelector(
  fromBacklog.getBacklogState,
  state => state.settings.showWIPLimits,
);

export const showStoryPoints = createSelector(
  fromBacklog.getBacklogState,
  state => state.settings.showStoryPoints,
);
export const showEstimateHours = createSelector(
  fromBacklog.getBacklogState,
  state => state.settings.showEstimatedHours,
);
