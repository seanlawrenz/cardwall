import * as fromCardDetails from '../reducer';
import { createSelector } from '@ngrx/store';

export const getCard = createSelector(
  fromCardDetails.getCardDetailsState,
  state => state.card.card,
);

export const getPlanFromCard = createSelector(
  fromCardDetails.getCardDetailsState,
  state => state.card.plan,
);

export const getCardSaveError = createSelector(
  fromCardDetails.getCardDetailsState,
  state => state.card.error,
);
