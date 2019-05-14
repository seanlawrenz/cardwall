import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import { fromRoot } from '@app/store';
import * as fromBoard from './board.reducer';
import * as fromUI from './ui.reducer';

export interface CardwallState {
  board: fromBoard.BoardState;
  ui: fromUI.CardwallUIState;
}

export interface State extends fromRoot.State {
  cardwall: CardwallState;
}

export const reducers: ActionReducerMap<CardwallState> = {
  board: fromBoard.reducer,
  ui: fromUI.reducer,
};

export const getCardwallState = createFeatureSelector<CardwallState>('cardwall');
