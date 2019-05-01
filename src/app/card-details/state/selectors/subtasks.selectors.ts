import { createSelector } from '@ngrx/store';
import * as fromCardDetails from '../reducer';

export const getSubtasks = createSelector(
  fromCardDetails.getCardDetailsState,
  state => state.subtasks.subtasks,
);

export const isSubtasksLoading = createSelector(
  fromCardDetails.getCardDetailsState,
  state => state.subtasks.loading,
);

export const getSubtasksError = createSelector(
  fromCardDetails.getCardDetailsState,
  state => state.subtasks.error,
);

export const isSubtasksSaving = createSelector(
  fromCardDetails.getCardDetailsState,
  state => state.subtasks.isSaving,
);
