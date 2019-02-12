import { NotificationTypes, NotifyActions } from '../actions/notification.actions';
import { Notification } from '@app/models';

export interface NotifyState {
  notifications: Notification[];
}

export const NOTIFY_STATE: NotifyState = {
  notifications: [],
};

export function reducer(state = NOTIFY_STATE, action: NotifyActions): NotifyState {
  let notifications: Notification[];
  switch (action.type) {
    case NotificationTypes.ADD_NOTIFICATION:
      notifications = Array.from(state.notifications);
      notifications.push(action.payload);
      return {
        ...state,
        notifications,
      };

    case NotificationTypes.REMOVE_NOTIFICATION:
      notifications = Array.from(state.notifications);
      notifications = notifications.filter(notify => notify !== action.payload);
      return {
        ...state,
        notifications,
      };

    default:
      return state;
  }
}
