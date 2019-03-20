import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { fromRoot } from '@app/store';
import * as fromCardDetails from '@app/card-details/state/';
import * as actions from '@app/card-details/state/actions';
import { Card, CardDetailsPageTypes } from '@app/models';

@Component({
  selector: 'td-card-details-base',
  templateUrl: './card-details-base.component.html',
  styleUrls: ['./card-details-base.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardDetailsBaseComponent implements OnInit {
  card$: Observable<Card>;
  cardDetailPage$: Observable<CardDetailsPageTypes>;
  constructor(private store: Store<fromRoot.State>) {}

  ngOnInit() {
    this.card$ = this.store.pipe(select(fromCardDetails.getCard));
    this.cardDetailPage$ = this.store.pipe(select(fromCardDetails.getCardDetailsPage));
  }
}
