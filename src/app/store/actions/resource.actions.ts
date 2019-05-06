import { Resources } from '@app/models';
import { Action } from '@ngrx/store';

export enum ResourceActionTypes {
  SELECTED_RESOURCE = '[RESOURCE] SELECTED RESOURCE',
}

export class SelectedResource implements Action {
  readonly type = ResourceActionTypes.SELECTED_RESOURCE;
  constructor(public payload: Resources) {}
}

export type ResourceActions = SelectedResource;
