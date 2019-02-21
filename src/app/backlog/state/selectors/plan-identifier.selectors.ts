import { createSelector } from '@ngrx/store';

import * as fromBacklog from '../reducer';

export const getPlanIdentifiers = createSelector(
  fromBacklog.getBacklogState,
  state => state.planIdentifiers.planIdentifiers,
);

export const getPlanIdentifiersError = createSelector(
  fromBacklog.getBacklogState,
  state => state.planIdentifiers.error,
);
