export enum IssueStatusType {
  none = 0,
  new = 1,
  inProcess = 2,
  completed = 3,
  cancelled = 4,
  onHold = 5,
  requested = 6,
}

export interface Issue {
  ID: number;
  title: string;
  responsibleUID: string;
  responsibleFullName: string;
  statusName: string;
  statusTypeID: IssueStatusType;
  priorityName: string;
  categoryName: string;
  modifiedDate: Date;
}
