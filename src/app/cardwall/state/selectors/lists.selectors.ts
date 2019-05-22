import { createSelector } from '@ngrx/store';
import * as fromCardwall from '../reducer';

import { find } from 'lodash';

export const getLists = createSelector(
  fromCardwall.getCardwallState,
  state => state.lists.lists,
);

export const isListSaving = createSelector(
  fromCardwall.getCardwallState,
  state => state.lists.saving,
);

export const getListsError = createSelector(
  fromCardwall.getCardwallState,
  state => state.lists.error,
);

export const getListCards = id =>
  createSelector(
    getLists,
    lists => find(lists, list => list.id === id).cards,
  );
