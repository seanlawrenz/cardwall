import * as fromCardDetails from '../reducer';
import { createSelector } from '@ngrx/store';

export const getCard = createSelector(
  fromCardDetails.getCardDetailsState,
  state => state.card.card,
);
