import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { fromRoot } from '@app/store';
import * as fromRootUI from '@app/store/actions/ui.actions';

@Component({
  selector: 'td-cardwall-settings-container',
  templateUrl: './cardwall-settings-container.component.html',
  styleUrls: ['./cardwall-settings-container.component.scss'],
})
export class CardwallSettingsContainerComponent implements OnInit {
  constructor(private store: Store<fromRoot.State>) {}

  ngOnInit() {}

  closeOptions() {
    this.store.dispatch(new fromRootUI.HideOptions());
  }
}
