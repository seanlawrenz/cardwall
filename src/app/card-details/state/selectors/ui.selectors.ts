import { createSelector } from '@ngrx/store';
import * as fromCardDetails from '../reducer';

export const getShowDetails = createSelector(
  fromCardDetails.getCardDetailsState,
  state => state.ui.showDetails,
);

export const getCardDetailsPage = createSelector(
  fromCardDetails.getCardDetailsState,
  state => state.ui.cardDetailsPage,
);
