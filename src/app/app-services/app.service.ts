import { Injectable, OnDestroy } from '@angular/core';
import { Card, Plan } from '@app/models';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fromRoot } from '@app/store';
import * as cardDetailActions from '@app/card-details/state/actions';
import * as backlogSelectors from '@app/backlog/state/selectors';

@Injectable({
  providedIn: 'root',
})
export class AppService implements OnDestroy {
  unsubscribe$ = new Subject<void>();
  constructor(private store: Store<fromRoot.State>) {}

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  showCardDetails(card: Card) {
    this.store
      .select(backlogSelectors.getPlanById(card.planId))
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((plan: Plan) => {
        if (plan) {
          this.store.dispatch(new cardDetailActions.CurrentCard({ card, plan }));
        }
      });
  }
}
