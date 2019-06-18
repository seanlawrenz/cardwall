import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
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
import { AppService } from './app.service';

import { findIndex } from 'lodash';

declare var Notification: any;

@Injectable({
  providedIn: 'root',
})
export class BrowserNotificationService {
  constructor(private config: ConfigService, private appService: AppService, private router: Router, private location: Location) {}

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

    if (!this.canReceiveNotification(JSON.parse(window.localStorage.getItem('Agile.Settings.CardWall.Notifications')), item)) {
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

    const isBacklog: boolean = this.location.path().includes('backlog');

    if (isBacklog) {
      this.appService.showCardDetails(card);
    } else {
      this.router.navigate([`cardwall/project/${card.projectId}/board/${card.planId}/card/${card.id}`]);
    }
  }

  private canReceiveNotification(notificationSetting: BrowserNotificationSettings, item: Card | List) {
    if (isNullOrUndefined(notificationSetting)) {
      return true;
    }

    if (notificationSetting === BrowserNotificationSettings.myItems) {
      let isUserOwner = false;
      const card: Card = { ...item } as Card;
      if (card && !isNullOrUndefined(card.owners)) {
        isUserOwner = findIndex(card.owners, resource => resource.uid === this.config.config.UID) !== -1;
        return isUserOwner;
      }
    } else if (notificationSetting === BrowserNotificationSettings.allItems) {
      return true;
    }

    return false;
  }

  private showNotification(notification: BrowserNotification, options: IBrowserNotificationOptions, item: Card | List) {
    const notificationObj: Notification = new Notification(notification.title, options);
    if (notificationObj && notification.action === BrowserNotificationActions.CardUpdate) {
      notificationObj.onclick = () => this.editCard(item);
    }
  }
}
