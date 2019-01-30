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
  lists: any[];
  myWorkTaskIDs: any[];
  name: string;
  priorities: any[];
  projectId: number;
  resources: any[];
  statusTypes: any;
  useRemainingHours: boolean;
}
