import { ResourceActionTypes, ResourceActions } from '../actions/resource.actions';
import { Resources } from '@app/models';

export interface ResourceState {
  selectedResource: Resources;
}

const initialState: ResourceState = {
  selectedResource: undefined,
};

export function reducer(state = initialState, action: ResourceActions): ResourceState {
  switch (action.type) {
    case ResourceActionTypes.SELECTED_RESOURCE:
      return {
        ...state,
        selectedResource: action.payload,
      };

    default:
      return state;
  }
}
