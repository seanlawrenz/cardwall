import { Resources } from './resources.model';

export interface Card {
  attachmentsCount: number;
  cssClass: string;
  description: string;
  endDate: Date;
  estimatedHours: number;
  id: number;
  isStory: boolean;
  issuesCount: number;
  listId: number;
  name: string;
  openIssuesCount: number;
  openSubtasksCount: number;
  order: number;
  owners: Resources[];
  tags: string[];
  percentComplete: number;
  planId: number;
  priorityId: number;
  projectId: number;
  remainingHours: number;
  startDate: Date;
  storyPoints: number;
  subtasksCount: number;
  ticketAppID: number;
  ticketID: number;
  valuePoints: number;
  version: string;
  codeCount: number;
}

export enum CardMovementTypes {
  START = 'START',
  ADD = 'ADD',
  UPDATE = 'UPDATE',
  END = 'END',
}

export interface CardOrderInfo {
  cardID: number;
  order: number;
}

export interface CardOperationInfo {
  card: Card;
  orders: CardOrderInfo[];
}

export interface CardReorder {
  cardId: number;
  index: number;
  listId: number;
}

export interface CardRemovedFromListInfo {
  cardId: number;
  oldListId: number;
}

export enum CardColors {
  DEFAULT = 'default',
  PRIMARY = 'primary',
  SUCCESS = 'success',
  INFO = 'info',
  WARNING = 'warning',
  DANGER = 'danger',
}

export enum CardDetailsPageTypes {
  FORM = 'FORM',
  FEED = 'FEED',
  SUBTASKS = 'SUBTASKS',
  WORK = 'WORK',
  ATTACHMENTS = 'ATTACHMENTS',
  ISSUES = 'ISSUES',
  CODE = 'CODE',
}
