import { Action } from '@ngrx/store';

export enum BacklogToolbarActionTypes {
  HIDE_TOOLBAR = '[BACKLOG UI] HIDE TOOLBAR',
  SHOW_RESOURCES = '[BACKLOG UI] SHOW RESOURCES',
  SHOW_TOTALS = '[BACKLOG UI] SHOW TOTALS',
}

export class HideToolbar implements Action {
  readonly type = BacklogToolbarActionTypes.HIDE_TOOLBAR;
}

export class ShowResources implements Action {
  readonly type = BacklogToolbarActionTypes.SHOW_RESOURCES;
}

export class ShowTotals implements Action {
  readonly type = BacklogToolbarActionTypes.SHOW_TOTALS;
}

export type BacklogToolbarActions = HideToolbar | ShowResources | ShowTotals;
