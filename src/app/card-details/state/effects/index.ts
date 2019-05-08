import { CardDetailsCardEffects } from './card.effects';
import { CopyMoveCardEffects } from './copyMove.effects';
import { CardDetailsSubtasksEffects } from './subtasks.effects';
import { CardDetailsAttachmentEffects } from './attachments.effects';
import { CardDetailsIssueEffects } from './issue.effect';

export const effects: any[] = [
  CardDetailsCardEffects,
  CopyMoveCardEffects,
  CardDetailsSubtasksEffects,
  CardDetailsAttachmentEffects,
  CardDetailsIssueEffects,
];

export * from './card.effects';
