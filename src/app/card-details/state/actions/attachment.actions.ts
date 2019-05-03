import { Action } from '@ngrx/store';
import { Card, Attachment, ErrorFromSignalR } from '@app/models';

export enum CardDetailsAttachmentTypes {
  FETCH_ATTACHMENTS = '[CARD DETAILS] FETCH ATTACHMENTS',
  FETCH_ATTACHMENTS_SUCCESS = '[CARD DETAILS] FETCH ATTACHMENTS SUCCESS',
  FETCH_ATTACHMENTS_ERROR = '[CARD DETAILS] FETCH ATTACHMENTS ERROR',
}

export class FetchAttachments implements Action {
  readonly type = CardDetailsAttachmentTypes.FETCH_ATTACHMENTS;
  constructor(public payload: Card) {}
}

export class FetchAttachmentsSuccess implements Action {
  readonly type = CardDetailsAttachmentTypes.FETCH_ATTACHMENTS_SUCCESS;
  constructor(public payload: Attachment[]) {}
}

export class FetchAttachmentsError implements Action {
  readonly type = CardDetailsAttachmentTypes.FETCH_ATTACHMENTS_ERROR;
  constructor(public payload: ErrorFromSignalR) {}
}

export type CardDetailsAttachmentActions = FetchAttachments | FetchAttachmentsSuccess | FetchAttachmentsError;
