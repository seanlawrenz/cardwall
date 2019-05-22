import { CardwallCardActions, CardwallCardActionTypes } from '../actions';
import { CardActions, CardActionTypes } from '@app/store/actions';
import { ErrorFromSignalR } from '@app/models';

export interface CardState {
  saving: boolean;
  error: ErrorFromSignalR;
}

export const initialState: CardState = {
  saving: false,
  error: undefined,
};

export function reducer(state = initialState, action: CardwallCardActions | CardActions): CardState {
  switch (action.type) {
    case CardwallCardActionTypes.CARD_MOVEMENT_SAVING:
      return {
        ...state,
        saving: true,
      };

    case CardwallCardActionTypes.CARD_MOVEMENT_END:
      return {
        ...state,
        saving: false,
      };

    default:
      return state;
  }
}
