import { Component, OnInit, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { fromRoot } from '@app/store';
import * as cardwallActions from '@app/cardwall/state/actions';
import * as cardwallSelectors from '@app/cardwall/state/selectors';

import { Card, Board, List, ErrorFromSignalR } from '@app/models';

@Component({
  selector: 'td-cardwall-cards-base',
  templateUrl: './cardwall-cards-base.component.html',
  styleUrls: ['./cardwall-cards-base.component.scss'],
})
export class CardwallCardsBaseComponent implements OnInit {
  @Input() board: Board;
  @Input() list: List;

  cards$: Observable<Card[]>;
  saving$: Observable<boolean>;
  error$: Observable<ErrorFromSignalR>;

  constructor(private store: Store<fromRoot.State>) {}

  ngOnInit() {
    this.cards$ = this.store.pipe(select(cardwallSelectors.getListCards(this.list.id)));
  }
}
