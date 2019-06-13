import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import * as cardwallActions from '@app/cardwall/state/actions';
import { BrowserNotificationPreferences } from '@app/models';

@Injectable()
export class CardwallUIEffects {
  constructor(private actions$: Actions) {}

  @Effect()
  getSettingsFromLocalStorage$: Observable<Action> = this.actions$.pipe(
    ofType(cardwallActions.CardwallUIActionTypes.GET_FROM_LOCAL_STORAGE),
    switchMap(action => {
      const storage: Storage = window.localStorage;
      const cardwallSettings: Action[] = [];

      const showInactive: boolean = JSON.parse(storage.getItem('Agile.Settings.CardWall.ShowInactive'));
      const showArchived: boolean = JSON.parse(storage.getItem('Agile.Settings.CardWall.ShowArchived'));
      const notificationOptions: string = JSON.parse(storage.getItem('Agile.Settings.CardWall.Notifications'));

      cardwallSettings.push(showInactive ? new cardwallActions.ShowInactiveLists() : new cardwallActions.HideInactiveLists());
      cardwallSettings.push(showArchived ? new cardwallActions.ShowArchivedCards() : new cardwallActions.HideArchivedCards());

      let notificationPreference: BrowserNotificationPreferences;
      switch (notificationOptions) {
        case 'none':
          notificationPreference = BrowserNotificationPreferences.NONE;
          break;

        case 'myItems':
          notificationPreference = BrowserNotificationPreferences.MY_ITEMS;
          break;

        case 'allItems':
          notificationPreference = BrowserNotificationPreferences.ALL;
          break;

        default:
          notificationPreference = BrowserNotificationPreferences.NONE;
      }
      cardwallSettings.push(new cardwallActions.ChangeNotificationType(notificationPreference));
      return cardwallSettings;
    }),
  );
}
