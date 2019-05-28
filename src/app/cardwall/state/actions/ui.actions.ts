import { Action } from '@ngrx/store';

export enum CardwallUIActionTypes {
  GET_FROM_LOCAL_STORAGE = '[CARDWALL UI] GET FROM LOCAL STORAGE',
  GET_FROM_LOCAL_STORAGE_SUCCESS = '[CARDWALL UI] GET FROM LOCAL STORAGE SUCCESS',
  SHOW_INACTIVE_LISTS = '[CARDWALL UI] SHOW INACTIVE LISTS',
  HIDE_INACTIVE_LISTS = '[CARDWALL UI] HIDE INACTIVE LISTS',
  SHOW_ARCHIVED_CARDS = '[CARDWALL UI] SHOW ARCHIVED CARDS',
  HIDE_ARCHIVED_CARDS = '[CARDWALL UI] HIDE ARCHIVED CARDS',
}

export class GetFromLocalStorage implements Action {
  readonly type = CardwallUIActionTypes.GET_FROM_LOCAL_STORAGE;
}

export class GetFromLocalStorageSuccess implements Action {
  readonly type = CardwallUIActionTypes.GET_FROM_LOCAL_STORAGE_SUCCESS;
  constructor(public paywall: any) {}
}

export class ShowInactiveLists implements Action {
  readonly type = CardwallUIActionTypes.SHOW_INACTIVE_LISTS;
}

export class HideInactiveLists implements Action {
  readonly type = CardwallUIActionTypes.HIDE_INACTIVE_LISTS;
}

export class ShowArchivedCards implements Action {
  readonly type = CardwallUIActionTypes.SHOW_ARCHIVED_CARDS;
}

export class HideArchivedCards implements Action {
  readonly type = CardwallUIActionTypes.HIDE_ARCHIVED_CARDS;
}

export type CardwallUIActions =
  | GetFromLocalStorage
  | GetFromLocalStorageSuccess
  | ShowInactiveLists
  | HideInactiveLists
  | ShowArchivedCards
  | HideArchivedCards;
