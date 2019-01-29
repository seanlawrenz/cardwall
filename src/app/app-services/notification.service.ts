import { Injectable } from '@angular/core';
import { Notification, NotificationType } from '@app/models';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  notifications: Notification[] = [];

  private notificationChangedSource = new Subject<Notification[]>();

  notificationChanged$ = this.notificationChangedSource.asObservable();

  add(notification: Notification): Notification {
    if (!notification) {
      return null;
    }

    this.notifications.push(notification);

    if (notification.DismissAfterSeconds) {
      const timeoutMilliseconds: number = notification.DismissAfterSeconds * 1000;

      setTimeout(() => {
        this.remove(notification);
      }, timeoutMilliseconds);
    }

    this.notificationChangedSource.next(this.notifications);
    return notification;
  }

  remove(notification: Notification) {
    const index: number = this.notifications.indexOf(notification);
    if (index > -1) {
      this.notifications.splice(index, 1);
    }
    this.notificationChangedSource.next(this.notifications);
  }

  clear() {
    if (this.notifications.length > 0) {
      this.notifications.splice(0, this.notifications.length);
    }
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
