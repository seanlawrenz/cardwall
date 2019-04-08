import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { fromRoot } from '@app/store';
import * as fromCardDetails from '@app/card-details/state/';
import * as actions from '@app/card-details/state/actions';
import { CardDetailsPageTypes } from '@app/models';

@Component({
  selector: 'td-card-details-dialog-base',
  templateUrl: './card-details-dialog-base.component.html',
  styleUrls: ['./card-details-dialog-base.component.scss'],
})
export class CardDetailsDialogBaseComponent implements OnInit, OnDestroy {
  showDetails$: Observable<boolean>;
  cardTab: CardDetailsPageTypes;
  sub = new Subscription();

  constructor(private store: Store<fromRoot.State>) {}

  ngOnInit() {
    this.showDetails$ = this.store.pipe(select(fromCardDetails.getShowDetails));
    this.sub.add(
      this.store.pipe(select(fromCardDetails.getCardDetailsPage)).subscribe((type: CardDetailsPageTypes) => {
        this.cardTab = type;
      }),
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  closeCardDetails() {
    if (this.cardTab === CardDetailsPageTypes.FORM) {
      this.store.dispatch(new actions.HideDetailsRequested());
    } else {
      this.store.dispatch(new actions.HideDetails());
    }
  }
}
