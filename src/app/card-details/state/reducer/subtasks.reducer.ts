import { CardDetailsSubtasksTypes, CardDetailsSubtasksActions } from '../actions';
import { Subtask } from '@app/models';
import { updateDataOnCollection } from '@app/utils';

export interface CardDetailsSubtaskState {
  subtasks: Subtask[];
  loading: boolean;
  error: string;
  isSaving: boolean;
}

export const initialState: CardDetailsSubtaskState = {
  subtasks: [],
  loading: false,
  error: '',
  isSaving: false,
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

    case CardDetailsSubtasksTypes.SET_SUBTASKS_ORDER:
      return {
        ...state,
        isSaving: true,
      };

    case CardDetailsSubtasksTypes.SET_SUBTASKS_ORDER_SUCCESS:
      return {
        ...state,
        isSaving: false,
      };

    case CardDetailsSubtasksTypes.SET_SUBTASKS_ORDER_ERROR:
      return {
        ...state,
        error: actions.payload,
        isSaving: false,
      };

    default:
      return state;
  }
}
