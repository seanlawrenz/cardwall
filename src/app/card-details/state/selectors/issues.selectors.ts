import { createSelector } from '@ngrx/store';
import * as fromCardDetails from '../reducer';

export const getIssues = createSelector(
  fromCardDetails.getCardDetailsState,
  state => state.issues.issues,
);

export const isIssuesLoading = createSelector(
  fromCardDetails.getCardDetailsState,
  state => state.issues.loading,
);

export const getIssuesErrors = createSelector(
  fromCardDetails.getCardDetailsState,
  state => state.issues.error,
);
