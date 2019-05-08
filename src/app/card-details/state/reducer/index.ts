import { fromRoot } from '@app/store';
import * as fromAttachments from './attachment.reducer';
import * as fromCard from './card.reducer';
import * as fromCopyMoveCard from './copy-move.reducer';
import * as fromIssues from './issues.reducer';
import * as fromSubtasks from './subtasks.reducer';
import * as fromUI from './ui.reducer';
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

export interface CardDetailsState {
  card: fromCard.CardDetailsCardState;
  copyMove: fromCopyMoveCard.CopyMoveCardState;
  subtasks: fromSubtasks.CardDetailsSubtaskState;
  attachments: fromAttachments.CardDetailsAttachmentState;
  issues: fromIssues.CardDetailsIssueState;
  ui: fromUI.CardDetailsUIState;
}

export interface State extends fromRoot.State {
  cardDetails: CardDetailsState;
}

export const reducers: ActionReducerMap<CardDetailsState> = {
  card: fromCard.reducer,
  copyMove: fromCopyMoveCard.reducer,
  subtasks: fromSubtasks.reducer,
  attachments: fromAttachments.reducer,
  issues: fromIssues.reducer,
  ui: fromUI.reducer,
};

export const getCardDetailsState = createFeatureSelector<CardDetailsState>('card-details');
