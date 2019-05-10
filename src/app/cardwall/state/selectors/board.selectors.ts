import { createSelector } from '@ngrx/store';
import * as fromCardwall from '../reducer';

export const getBoard = createSelector(
  fromCardwall.getCardwallState,
  state => state.board.board,
);
