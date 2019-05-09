import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { fromRoot } from '@app/store';

import * as boardActions from '@app/cardwall/state/actions';

@Component({
  selector: 'app-cardwall-base',
  templateUrl: './cardwall-base.component.html',
  styleUrls: ['./cardwall-base.component.scss'],
})
export class CardwallBaseComponent implements OnInit {
  constructor(private store: Store<fromRoot.State>) {}

  ngOnInit() {
    this.store.dispatch(new boardActions.GetBoard());
  }
}
