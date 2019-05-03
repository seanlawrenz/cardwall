import { CardDetailsAttachmentActions, CardDetailsAttachmentTypes } from '../actions';
import { Attachment, ErrorFromSignalR } from '@app/models';

export interface CardDetailsAttachmentState {
  loading: boolean;
  attachments: Attachment[];
  error: ErrorFromSignalR;
}

export const initialState: CardDetailsAttachmentState = {
  loading: false,
  attachments: [],
  error: null,
};

export function reducer(state = initialState, action: CardDetailsAttachmentActions): CardDetailsAttachmentState {
  switch (action.type) {
    case CardDetailsAttachmentTypes.FETCH_ATTACHMENTS:
      return {
        ...state,
        loading: true,
      };

    case CardDetailsAttachmentTypes.FETCH_ATTACHMENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        attachments: action.payload,
      };

    case CardDetailsAttachmentTypes.FETCH_ATTACHMENTS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}
