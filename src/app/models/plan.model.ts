import { BoardColors } from './board.model';

export interface PlanIdentifier {
  planID: number;
  projectID: number;
  planName: string;
  projectName: string;
}

export interface Plan {
  id: number;
  name: string;
  description: string;
  projectId: number;
  projectName: string;
  useRemainingHours: boolean;
  iAmProjectManager: boolean;
  iCanEditPlans: boolean;
  lists: any[];
  priorities: any[];
  resources: any[];
  statusTypes: any[];
  colors: BoardColors[];
  myWorkTaskIDs: any[];
  isResourceAssignmentEnabled: boolean;
  isFeedEnabled: boolean;
  isAttachmentsEnabled: boolean;
  isTimeEntryEnabled: boolean;
  isTaskUpdateEnabled: boolean;
  isIssuesEnabled: boolean;
  isTicketToTaskEnabled: boolean;
  isReportsEnabled: boolean;
  isTemplate: boolean;
  erroredDuringFetching?: boolean;
  message?: string;
  reason?: string;
}
