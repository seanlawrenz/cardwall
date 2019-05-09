import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import { fromRoot } from '@app/store';
import * as fromBoard from './board.reducer';

export interface CardwallState {
  board: fromBoard.BoardState;
}

export interface State extends fromRoot.State {
  cardwall: CardwallState;
}

export const reducers: ActionReducerMap<CardwallState> = {
  board: fromBoard.reducer,
};

export const getCardwallState = createFeatureSelector<CardwallState>('cardwall');
