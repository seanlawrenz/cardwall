import { CardDetailsUIActions, CardDetailsUITypes } from '../actions';
import { CardDetailsPageTypes } from '@app/models';

export interface CardDetailsUIState {
  showDetails: boolean;
  cardDetailsPage: CardDetailsPageTypes;
}

export const initialState: CardDetailsUIState = {
  showDetails: false,
  cardDetailsPage: CardDetailsPageTypes.FORM,
};

export function reducer(state = initialState, action: CardDetailsUIActions): CardDetailsUIState {
  switch (action.type) {
    case CardDetailsUITypes.SHOW_DETAILS:
      return {
        ...state,
        showDetails: true,
      };

    case CardDetailsUITypes.HIDE_DETAILS:
      return {
        ...state,
        showDetails: false,
      };

    case CardDetailsUITypes.SHOW_FORM:
      return {
        ...state,
        cardDetailsPage: CardDetailsPageTypes.FORM,
      };

    case CardDetailsUITypes.SHOW_FEED:
      return {
        ...state,
        cardDetailsPage: CardDetailsPageTypes.FEED,
      };

    case CardDetailsUITypes.SHOW_SUBTASKS:
      return {
        ...state,
        cardDetailsPage: CardDetailsPageTypes.SUBTASKS,
      };

    case CardDetailsUITypes.SHOW_WORK:
      return {
        ...state,
        cardDetailsPage: CardDetailsPageTypes.WORK,
      };

    case CardDetailsUITypes.SHOW_ATTACHMENTS:
      return {
        ...state,
        cardDetailsPage: CardDetailsPageTypes.ATTACHMENTS,
      };

    case CardDetailsUITypes.SHOW_ISSUES:
      return {
        ...state,
        cardDetailsPage: CardDetailsPageTypes.ISSUES,
      };

    case CardDetailsUITypes.SHOW_CODE:
      return {
        ...state,
        cardDetailsPage: CardDetailsPageTypes.CODE,
      };

    default:
      return state;
  }
}
