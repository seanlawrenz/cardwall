import { LOADER_SHOW, LOADER_HIDE, LoaderActions } from '../actions/loading.actions';

export interface LoadingState {
  show: boolean;
}

const initialState: LoadingState = {
  show: false,
};

export function reducer(state = initialState, action: LoaderActions) {
  switch (action.type) {
    case LOADER_SHOW:
      return { ...state, show: true };

    case LOADER_HIDE:
      return { ...state, show: false };

    default:
      return state;
  }
}

export const isLoading = (state: LoadingState) => state.show;
