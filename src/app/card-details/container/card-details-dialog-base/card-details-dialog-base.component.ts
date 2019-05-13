import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';

import { fromRoot } from '@app/store';
import * as fromCardDetails from '@app/card-details/state/';
import * as actions from '@app/card-details/state/actions';
import { CardDetailsPageTypes } from '@app/models';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'td-card-details-dialog-base',
  templateUrl: './card-details-dialog-base.component.html',
  styleUrls: ['./card-details-dialog-base.component.scss'],
})
export class CardDetailsDialogBaseComponent implements OnInit, OnDestroy {
  @Output() detailsAreHidden = new EventEmitter<void>();

  showDetails$: Observable<boolean>;
  cardTab: CardDetailsPageTypes;

  unsubscribe$ = new Subject<void>();

  constructor(private store: Store<fromRoot.State>) {}

  ngOnInit() {
    this.showDetails$ = this.store.pipe(select(fromCardDetails.getShowDetails));
    this.store
      .pipe(
        select(fromCardDetails.getCardDetailsPage),
        takeUntil(this.unsubscribe$),
      )
      .subscribe((type: CardDetailsPageTypes) => {
        this.cardTab = type;
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  closeCardDetails() {
    if (this.cardTab === CardDetailsPageTypes.FORM) {
      this.store.dispatch(new actions.HideDetailsRequested());
    } else {
      this.store.dispatch(new actions.HideDetails());
    }
  }

  detailsHidden() {
    this.detailsAreHidden.emit();
  }
}
