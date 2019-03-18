import { Action } from '@ngrx/store';

export enum CardDetailsUITypes {
  SHOW_DETAILS = '[CARD DETAILS UI] SHOW DETAILS',
  HIDE_DETAILS = '[CARD DETAILS UI] HIDE DETAILS',
}

export class ShowDetails implements Action {
  readonly type = CardDetailsUITypes.SHOW_DETAILS;
}

export class HideDetails implements Action {
  readonly type = CardDetailsUITypes.HIDE_DETAILS;
}

export type CardDetailsUIActions = ShowDetails | HideDetails;
