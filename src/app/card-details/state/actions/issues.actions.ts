import { Action } from '@ngrx/store';
import { Card, Issue, ErrorFromSignalR } from '@app/models';

export enum CardDetailsIssueTypes {
  FETCH_ISSUES = '[CARD DETAILS] FETCH ISSUES',
  FETCH_ISSUES_SUCCESS = '[CARD DETAILS] FETCH ISSUES SUCCESS',
  FETCH_ISSUES_ERROR = '[CARD DETAILS] FETCH ISSUES ERROR',
}

export class FetchIssues implements Action {
  readonly type = CardDetailsIssueTypes.FETCH_ISSUES;
  constructor(public payload: Card) {}
}

export class FetchIssuesSuccess implements Action {
  readonly type = CardDetailsIssueTypes.FETCH_ISSUES_SUCCESS;
  constructor(public payload: Issue[]) {}
}

export class FetchIssuesError implements Action {
  readonly type = CardDetailsIssueTypes.FETCH_ISSUES_ERROR;
  constructor(public payload: ErrorFromSignalR) {}
}

export type CardDetailsIssueActions = FetchIssues | FetchIssuesSuccess | FetchIssuesError;
