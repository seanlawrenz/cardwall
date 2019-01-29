import { Component, OnInit, OnDestroy } from '@angular/core';
import { Notification, NotificationType } from '@app/models';
import { Subscription } from 'rxjs';
import { NotificationService } from '@app/app-services/notification.service';

@Component({
  selector: 'td-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit, OnDestroy {
  notifications: Notification[];
  notificationSub: Subscription;
  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    this.notificationSub = this.notificationService.notificationChanged$.subscribe(notifications => (this.notifications = notifications));
  }

  ngOnDestroy() {
    this.notificationSub.unsubscribe();
  }

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
    this.notificationService.remove(notification);
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
