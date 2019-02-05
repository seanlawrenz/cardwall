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
