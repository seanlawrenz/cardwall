import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromLoader from '../reducers/loader.reducer';

export const getLoadingState = createFeatureSelector<fromLoader.LoadingState>('loader');

export const isLoading = createSelector(
  getLoadingState,
  state => state.show,
);
