import { createSelector } from '@ngrx/store';

import * as fromBacklog from '../reducer';

export const showResources = createSelector(
  fromBacklog.getBacklogState,
  state => state.toolbar.showResources,
);

export const showTotals = createSelector(
  fromBacklog.getBacklogState,
  state => state.toolbar.showTotals,
);
