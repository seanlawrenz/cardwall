import { fromRoot } from '@app/store';
import * as fromUI from './ui.reducer';
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

export interface CardDetailsState {
  ui: fromUI.CardDetailsUIState;
}

export interface State extends fromRoot.State {
  cardDetails: CardDetailsState;
}

export const reducers: ActionReducerMap<CardDetailsState> = {
  ui: fromUI.reducer,
};

export const getCardDetailsState = createFeatureSelector<CardDetailsState>('card-details');
