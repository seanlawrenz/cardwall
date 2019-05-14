import { List } from './list.model';
import { Resources } from './resources.model';

export interface BoardColors {
  cssClass: string;
  label: string;
  name: string;
}

export interface Board {
  colors: BoardColors[];
  description: string;
  iAmProjectManager: boolean;
  iCanEditPlans: boolean;
  id: number;
  isAttachmentsEnabled: boolean;
  isFeedEnabled: boolean;
  isIssuesEnabled: boolean;
  isReportsEnabled: boolean;
  isResourceAssignmentEnabled: boolean;
  isTaskUpdateEnabled: boolean;
  isTemplate: boolean;
  isTicketToTaskEnabled: boolean;
  isTimeEntryEnabled: boolean;
  lists: List[];
  myWorkTaskIDs: any[];
  name: string;
  priorities: any[];
  projectId: number;
  resources: Resources[];
  statusTypes: any;
  useRemainingHours: boolean;
  projectName: string;
}
