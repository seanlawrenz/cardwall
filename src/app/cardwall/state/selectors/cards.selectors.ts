import { createSelector } from '@ngrx/store';
import * as fromCardwall from '../reducer';

export const isCardsSaving = createSelector(
  fromCardwall.getCardwallState,
  state => state.cards.saving,
);
