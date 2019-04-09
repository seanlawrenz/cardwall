import { createSelector } from '@ngrx/store';
import * as fromCardDetails from '../reducer';

export const getProjects = createSelector(
  fromCardDetails.getCardDetailsState,
  state => state.copyMove.projects,
);

export const getPlans = createSelector(
  fromCardDetails.getCardDetailsState,
  state => state.copyMove.plans,
);

export const getLists = createSelector(
  fromCardDetails.getCardDetailsState,
  state => state.copyMove.lists,
);

export const getCopyMoveLoading = createSelector(
  fromCardDetails.getCardDetailsState,
  state => state.copyMove.loading,
);

export const getPlansLoading = createSelector(
  fromCardDetails.getCardDetailsState,
  state => state.copyMove.plansLoading,
);

export const getListsLoading = createSelector(
  fromCardDetails.getCardDetailsState,
  state => state.copyMove.listsLoading,
);

export const getCopyMoveResult = createSelector(
  fromCardDetails.getCardDetailsState,
  state => state.copyMove.card,
);

export const getError = createSelector(
  fromCardDetails.getCardDetailsState,
  state => state.copyMove.error,
);
