import { fromRoot } from '@app/store';
import { BacklogState } from './backlog.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface State extends fromRoot.State {
  backlog: BacklogState;
}

const getBacklogFeatureState = createFeatureSelector<BacklogState>('backlog');

export const getPlans = createSelector(
  getBacklogFeatureState,
  state => state.planList,
);

export const getPlansError = createSelector(
  getBacklogFeatureState,
  state => state.error,
);

export const getBoards = createSelector(
  getBacklogFeatureState,
  state => state.boards,
);

export const isBoardsLoading = createSelector(
  getBacklogFeatureState,
  state => state.boardsLoading,
);
