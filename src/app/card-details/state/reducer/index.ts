import { fromRoot } from '@app/store';
import * as fromCard from './card.reducer';
import * as fromUI from './ui.reducer';
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

export interface CardDetailsState {
  card: fromCard.CardDetailsCardState;
  ui: fromUI.CardDetailsUIState;
}

export interface State extends fromRoot.State {
  cardDetails: CardDetailsState;
}

export const reducers: ActionReducerMap<CardDetailsState> = {
  card: fromCard.reducer,
  ui: fromUI.reducer,
};

export const getCardDetailsState = createFeatureSelector<CardDetailsState>('card-details');
