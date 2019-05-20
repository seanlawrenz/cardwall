import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUI from '../reducers/ui.reducer';

export const getUIState = createFeatureSelector<fromUI.UIState>('ui');

export const isListsExpanded = createSelector(
  getUIState,
  state => state.expandLists,
);

export const isBoardsExpanded = createSelector(
  getUIState,
  state => state.expandBoards,
);

export const isSpinnerShowing = createSelector(
  getUIState,
  state => state.showSpinner,
);

export const isOptionsShowing = createSelector(
  getUIState,
  state => state.showOptions,
);

export const isSliderShowing = createSelector(
  getUIState,
  state => state.showSlider,
);
