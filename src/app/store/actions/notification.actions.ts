import { Action } from '@ngrx/store';
import { Notification } from '@app/models';

export enum NotificationTypes {
  ADD_NOTIFICATION = '[NOTIFY]] ADD NOTIFICATION',
  REMOVE_NOTIFICATION = '[NOTIFY] REMOVE NOTIFICATION',
}

export class AddNotification implements Action {
  readonly type = NotificationTypes.ADD_NOTIFICATION;
  constructor(public payload: Notification) {}
}

export class RemoveNotification implements Action {
  readonly type = NotificationTypes.REMOVE_NOTIFICATION;
  constructor(public payload: Notification) {}
}

export type NotifyActions = AddNotification | RemoveNotification;
