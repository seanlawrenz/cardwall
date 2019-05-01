import { CardDetailsSubtasksTypes, CardDetailsSubtasksActions } from '../actions';
import { Subtask } from '@app/models';
import { updateDataOnCollection } from '@app/utils';

export interface CardDetailsSubtaskState {
  subtasks: Subtask[];
  loading: boolean;
  error: string;
}

export const initialState: CardDetailsSubtaskState = {
  subtasks: [],
  loading: false,
  error: '',
};

export function reducer(state = initialState, actions: CardDetailsSubtasksActions): CardDetailsSubtaskState {
  switch (actions.type) {
    case CardDetailsSubtasksTypes.FETCH_SUBTASKS:
      return {
        ...state,
        loading: true,
      };

    case CardDetailsSubtasksTypes.FETCH_SUBTASKS_SUCCESS:
      return {
        ...state,
        subtasks: actions.payload,
        loading: false,
        error: '',
      };

    case CardDetailsSubtasksTypes.FETCH_SUBTASKS_ERROR:
      return {
        ...state,
        loading: false,
        error: actions.payload,
      };

    case CardDetailsSubtasksTypes.UPDATE_SUBTASK_SUCCESS:
      return {
        ...state,
        subtasks: updateDataOnCollection(state.subtasks, actions.payload.ID, actions.payload, 'ID'),
      };

    default:
      return state;
  }
}
