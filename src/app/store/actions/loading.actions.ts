import { createActionType } from '../utils/create-action-type';
import { Action } from '@ngrx/store';

export const LOADER_SHOW = createActionType('LOADER_SHOW');
export const LOADER_HIDE = createActionType('LOADER_HIDE');

export class ShowLoader implements Action {
  readonly type = LOADER_SHOW;
}

export class HideLoader implements Action {
  readonly type = LOADER_HIDE;
}

export type LoaderActions = ShowLoader | HideLoader;
