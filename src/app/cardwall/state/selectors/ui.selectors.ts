import { createSelector } from '@ngrx/store';
import * as fromCardwall from '../reducer';

export const isSaving = createSelector(
  fromCardwall.getCardwallState,
  state => state.ui.saving,
);

export const showInactiveLists = createSelector(
  fromCardwall.getCardwallState,
  state => state.ui.showInactiveLists,
);

export const showArchivedCards = createSelector(
  fromCardwall.getCardwallState,
  state => state.ui.showArchivedCards,
);

export const showResources = createSelector(
  fromCardwall.getCardwallState,
  state => state.ui.showResources,
);
