import { Component, OnInit, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { fromRoot } from '@app/store';
import * as fromRootUI from '@app/store/actions/ui.actions';
import * as cardwallActions from '@app/cardwall/state/actions';
import * as cardwallSelectors from '@app/cardwall/state/selectors';
import { Board, BrowserNotificationPreferences } from '@app/models';

@Component({
  selector: 'td-cardwall-settings-container',
  templateUrl: './cardwall-settings-container.component.html',
  styleUrls: ['./cardwall-settings-container.component.scss'],
})
export class CardwallSettingsContainerComponent implements OnInit {
  @Input() board: Board;

  showInactiveLists$: Observable<boolean>;
  showArchivedCards$: Observable<boolean>;
  notificationPreference$: Observable<BrowserNotificationPreferences>;

  constructor(private store: Store<fromRoot.State>) {}

  ngOnInit() {
    this.store.dispatch(new cardwallActions.GetFromLocalStorage());
    this.showInactiveLists$ = this.store.pipe(select(cardwallSelectors.showInactiveLists));
    this.showArchivedCards$ = this.store.pipe(select(cardwallSelectors.showArchivedCards));
    this.notificationPreference$ = this.store.pipe(select(cardwallSelectors.notificationSetting));
  }

  closeOptions() {
    this.store.dispatch(new fromRootUI.HideOptions());
  }

  toggleShowInactiveLists(show: boolean) {
    show ? this.store.dispatch(new cardwallActions.ShowInactiveLists()) : this.store.dispatch(new cardwallActions.HideInactiveLists());
  }

  toggleShowArchiveCards(show: boolean) {
    show ? this.store.dispatch(new cardwallActions.ShowArchivedCards()) : this.store.dispatch(new cardwallActions.HideArchivedCards());
  }

  changeNotify(type: BrowserNotificationPreferences) {
    this.store.dispatch(new cardwallActions.ChangeNotificationType(type));
  }
}
