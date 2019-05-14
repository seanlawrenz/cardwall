import { createSelector } from '@ngrx/store';
import * as fromCardwall from '../reducer';

export const isSaving = createSelector(
  fromCardwall.getCardwallState,
  state => state.ui.saving,
);
