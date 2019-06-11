import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromCard from '../reducers/card.reducer';

export const getCardState = createFeatureSelector<fromCard.CardState>('card');

export const getSelectedCard = createSelector(
  getCardState,
  state => state.selectedCard,
);

export const getSelectedCardElement = createSelector(
  getCardState,
  state => state.selectedCardElement,
);
