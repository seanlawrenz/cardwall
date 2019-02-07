import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Notification, NotificationType } from '@app/models';

@Component({
  selector: 'td-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent {
  @Input() notifications: Notification[];

  @Output() removeNotification = new EventEmitter<Notification>();

  getAlertClass(notificationType: NotificationType): string {
    let result = '';

    switch (notificationType) {
      case NotificationType.Danger:
        result = 'alert-danger';
        break;

      case NotificationType.Info:
        result = 'alert-info';
        break;

      case NotificationType.Success:
        result = 'alert-success';
        break;

      case NotificationType.Warning:
        result = 'alert-warning';
        break;

      default:
        result = '';
    }

    return result;
  }

  remove(notification: Notification) {
    this.removeNotification.emit(notification);
  }

  onClick(notification: Notification) {
    if (notification.OnClick) {
      notification.OnClick();
    }
  }

  getCursorStyle(notification: Notification): string {
    if (notification.OnClick) {
      return 'pointer';
    } else {
      return 'auto';
    }
  }
}
