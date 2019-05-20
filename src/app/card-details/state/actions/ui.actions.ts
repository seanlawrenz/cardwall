import { Action } from '@ngrx/store';

export enum CardDetailsUITypes {
  SHOW_DETAILS = '[CARD DETAILS UI] SHOW DETAILS',
  HIDE_DETAILS = '[CARD DETAILS UI] HIDE DETAILS',
  HIDE_DETAILS_REQUESTED = '[CARD DETAILS UI]] HIDE DETAILS REQUESTED',
  DETAILS_HIDDEN = '[CARD DETAILS UI] DETAILS HIDDEN',
  SHOW_FORM = '[CARD DETAILS UI] SHOW FORM',
  SHOW_FEED = '[CARD DETAILS UI] SHOW FEED',
  SHOW_SUBTASKS = '[CARD DETAILS UI] SHOW SUBTASKS',
  SHOW_WORK = '[CARD DETAILS UI] SHOW WORK',
  SHOW_ATTACHMENTS = '[CARD DETAILS UI] SHOW ATTACHMENTS',
  SHOW_ISSUES = '[CARD DETAILS UI] SHOW ISSUES',
  SHOW_CODE = '[CARD DETAILS UI] SHOW CODE',
}

export class ShowDetails implements Action {
  readonly type = CardDetailsUITypes.SHOW_DETAILS;
}

export class HideDetails implements Action {
  readonly type = CardDetailsUITypes.HIDE_DETAILS;
}

export class HideDetailsRequested implements Action {
  readonly type = CardDetailsUITypes.HIDE_DETAILS_REQUESTED;
}

export class DetailsHidden implements Action {
  readonly type = CardDetailsUITypes.DETAILS_HIDDEN;
}

export class ShowForm implements Action {
  readonly type = CardDetailsUITypes.SHOW_FORM;
}

export class ShowFeed implements Action {
  readonly type = CardDetailsUITypes.SHOW_FEED;
}

export class ShowSubtasks implements Action {
  readonly type = CardDetailsUITypes.SHOW_SUBTASKS;
}

export class ShowWork implements Action {
  readonly type = CardDetailsUITypes.SHOW_WORK;
}

export class ShowAttachments implements Action {
  readonly type = CardDetailsUITypes.SHOW_ATTACHMENTS;
}

export class ShowIssues implements Action {
  readonly type = CardDetailsUITypes.SHOW_ISSUES;
}

export class ShowCode implements Action {
  readonly type = CardDetailsUITypes.SHOW_CODE;
}

export type CardDetailsUIActions =
  | ShowDetails
  | HideDetails
  | HideDetailsRequested
  | DetailsHidden
  | ShowForm
  | ShowFeed
  | ShowSubtasks
  | ShowWork
  | ShowAttachments
  | ShowIssues
  | ShowCode;
