import { Injectable } from '@angular/core';
import { Notification, NotificationType } from '@app/models';

import { Store } from '@ngrx/store';
import { fromRoot } from '@app/store';
import * as notifyActions from '@app/store/actions/notification.actions';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private store: Store<fromRoot.State>) {}

  add(notification: Notification): Notification {
    if (!notification) {
      return null;
    }

    this.store.dispatch(new notifyActions.AddNotification(notification));
    return notification;
  }

  remove(notification: Notification) {
    this.store.dispatch(new notifyActions.RemoveNotification(notification));
  }

  warning(title: string, body: string, dismissAfterSeconds: number = 0, onClick: () => void = null): Notification {
    return this.add(new Notification(title, body, NotificationType.Warning, dismissAfterSeconds, onClick));
  }

  danger(title: string, body: string, dismissAfterSeconds: number = 0, onClick: () => void = null): Notification {
    return this.add(new Notification(title, body, NotificationType.Danger, dismissAfterSeconds, onClick));
  }

  info(title: string, body: string, dismissAfterSeconds: number = 2, onClick: () => void = null): Notification {
    return this.add(new Notification(title, body, NotificationType.Info, dismissAfterSeconds, onClick));
  }

  success(title: string, body: string, dismissAfterSeconds: number = 2, onClick: () => void = null): Notification {
    return this.add(new Notification(title, body, NotificationType.Success, dismissAfterSeconds, onClick));
  }
}
