import { createSelector } from '@ngrx/store';
import * as fromCardDetails from '../reducer';

export const getAttachments = createSelector(
  fromCardDetails.getCardDetailsState,
  state => state.attachments.attachments,
);

export const isAttachmentsLoading = createSelector(
  fromCardDetails.getCardDetailsState,
  state => state.attachments.loading,
);

export const getAttachmentError = createSelector(
  fromCardDetails.getCardDetailsState,
  state => state.attachments.error,
);
