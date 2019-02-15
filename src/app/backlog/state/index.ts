import { fromRoot } from '@app/store';
import { BacklogState } from './backlog.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

import { find } from 'lodash';

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
  state => state.plans,
);

export const isBoardsLoading = createSelector(
  getBacklogFeatureState,
  state => state.plansLoading,
);

export const getBoardById = boardId =>
  createSelector(
    getBoards,
    plans => find(plans, plan => plan.id === boardId),
  );

export const getListById = (boardId, listId) =>
  createSelector(
    getBoardById(boardId),
    board => find(board.lists, list => list.id === listId),
  );
