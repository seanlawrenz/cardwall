import { CopyMoveCardTypes, CopyMoveCardActions } from '../actions';
import { Plan, Project, List, Card } from '@app/models';

export interface CopyMoveCardState {
  projects: Project[];
  plans: Plan[];
  lists: List[];
  loading: boolean;
  plansLoading: boolean;
  listsLoading: boolean;
  error: string;
  card: Card;
}

export const initialState: CopyMoveCardState = {
  projects: [],
  plans: [],
  lists: [],
  loading: false,
  plansLoading: false,
  listsLoading: false,
  error: undefined,
  card: undefined,
};

export function reducer(state = initialState, actions: CopyMoveCardActions): CopyMoveCardState {
  switch (actions.type) {
    case CopyMoveCardTypes.GET_PROJECTS:
      return {
        ...state,
        loading: true,
      };

    case CopyMoveCardTypes.GET_PROJECTS_SUCCESS:
      return {
        ...state,
        projects: actions.payload,
        loading: false,
        error: undefined,
      };

    case CopyMoveCardTypes.GET_PROJECTS_ERROR:
      return {
        ...state,
        loading: false,
        error: actions.payload,
      };

    case CopyMoveCardTypes.GET_PLANS:
      return {
        ...state,
        plansLoading: true,
      };

    case CopyMoveCardTypes.GET_PLANS_SUCCESS:
      return {
        ...state,
        plansLoading: false,
        plans: actions.payload,
        error: undefined,
      };

    case CopyMoveCardTypes.GET_PLANS_ERROR:
      return {
        ...state,
        plansLoading: false,
        error: actions.payload,
      };

    case CopyMoveCardTypes.GET_LISTS:
      return {
        ...state,
        listsLoading: true,
      };

    case CopyMoveCardTypes.GET_LISTS_SUCCESS:
      return {
        ...state,
        listsLoading: false,
        lists: actions.payload,
        error: undefined,
      };

    case CopyMoveCardTypes.GET_LISTS_ERROR:
      return {
        ...state,
        listsLoading: false,
        error: actions.payload,
      };

    case CopyMoveCardTypes.COPY_MOVE_CARD:
      return {
        ...state,
        loading: true,
      };

    case CopyMoveCardTypes.COPY_MOVE_CARD_SUCCESS:
      return {
        ...state,
        loading: false,
        error: undefined,
        card: actions.payload,
      };

    case CopyMoveCardTypes.COPY_MOVE_CARD_ERROR:
      return {
        ...state,
        loading: false,
        error: actions.payload,
      };

    default:
      return state;
  }
}
