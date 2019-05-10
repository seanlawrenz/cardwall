import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import { fromRoot, rootSelectors } from '@app/store';
import * as notifyActions from '@app/store/actions/notification.actions';
import { Observable } from 'rxjs';

import { Notification } from '@app/models';
import { map } from 'rxjs/operators';

@Component({
  selector: 'td-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements OnInit {
  notifications$: Observable<Notification[]>;

  constructor(private store: Store<fromRoot.State>) {}

  ngOnInit() {
    this.notifications$ = this.store.pipe(
      select(rootSelectors.getNotifications),
      map((notifications: Notification[]) => {
        notifications.map((notification: Notification) => {
          if (notification.DismissAfterSeconds) {
            const timeoutMilliseconds: number = notification.DismissAfterSeconds * 1000;

            setTimeout(() => {
              this.removeNotification(notification);
            }, timeoutMilliseconds);
          }
        });
        return notifications;
      }),
    );
  }

  removeNotification(notification: Notification) {
    this.store.dispatch(new notifyActions.RemoveNotification(notification));
  }
}
