export enum BrowserNotificationActions {
  CardUpdate = 'CardUpdate',
  CardDelete = 'CardDelete',
  CardCreate = 'CardCreate',
  ListUpdate = 'ListUpdate',
}

export enum BrowserNotificationSettings {
  none = 'none',
  myItems = 'myItems',
  allItems = 'allItems',
}

export interface BrowserNotification {
  message: string;
  title: string;
  icon: string;
  changes: string[];
  action: BrowserNotificationActions;
  serializedItem: string;
  originator: string;
}

export interface IBrowserNotificationOptions {
  body: string;
  icon: string;
}
