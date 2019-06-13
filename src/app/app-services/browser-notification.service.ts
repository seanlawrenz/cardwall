import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigService } from './config.service';

import {
  BrowserNotification,
  IBrowserNotificationOptions,
  Card,
  List,
  BrowserNotificationSettings,
  BrowserNotificationActions,
} from '@app/models';

import { isNullOrUndefined } from 'util';

declare var Notification: any;

@Injectable({
  providedIn: 'root',
})
export class BrowserNotificationService {
  constructor(private config: ConfigService, private router: Router) {}

  processNotification(notification: BrowserNotification) {
    const options: IBrowserNotificationOptions = {
      body: notification.message,
      icon: notification.icon,
    };

    if (notification.originator === this.config.config.UID) {
      return;
    }

    const receiver = (key: string, val: any): any => {
      if (val && typeof val === 'object') {
        // tslint:disable-next-line:prefer-const
        for (let k in val) {
          if (/^[A-Z]/.test(k) && Object.hasOwnProperty.call(val, k)) {
            val[k.charAt(0).toLowerCase() + k.substring(1)] = val[k];
            delete val[k];
          }
        }
      }

      return val;
    };

    const item: Card | List = JSON.parse(notification.serializedItem, receiver);

    if (!this.canReceiveNotification(item)) {
      return;
    }

    if (!('Notification' in window)) {
      // Notifications are not supported so return
      return;
    } else if (Notification.permission === 'granted') {
      // Permission has been granted so show the notification
      this.showNotification(notification, options, item);
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission(
        (permission: NotificationPermission): void => {
          if (!('permission' in Notification)) {
            // Store the permission
            Notification.permission = permission;
          }

          if (permission === 'granted') {
            // Permission has just been granted so display the notification
            this.showNotification(notification, options, item);
          }
        },
      );
    }
  }

  editCard(item: Card | List) {
    const card = item as Card;

    // Hack to see if the item is a list
    if (isNullOrUndefined(card.owners)) {
      return;
    }

    // this.router.navigateByUrl(
    //   `${this.config.config.TDNextBasePath}/Apps/Projects/Agile/cardwall/project/${card.projectId}/board/${card.planId}/card/${card.id}`,
    // );

    this.router.navigate([`cardwall/project/${card.projectId}/board/${card.planId}/card/${card.id}`]);
  }

  private canReceiveNotification(item: Card | List): boolean {
    const notifications: BrowserNotificationSettings = BrowserNotificationSettings.allItems;

    return true;
  }

  private showNotification(notification: BrowserNotification, options: IBrowserNotificationOptions, item: Card | List) {
    const notificationObj: Notification = new Notification(notification.title, options);
    if (notificationObj && notification.action === BrowserNotificationActions.CardUpdate) {
      notificationObj.onclick = () => this.editCard(item);
    }
  }
}
