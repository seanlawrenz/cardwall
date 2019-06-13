import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { fromRoot } from '@app/store';
import * as cardwallSelectors from '@app/cardwall/state/selectors';

import { List } from '@app/models';

@Component({
  selector: 'td-totals-container',
  templateUrl: './totals-container.component.html',
})
export class TotalsContainerComponent implements OnInit {
  @Output() closeTotalRequested = new EventEmitter<void>();

  lists$: Observable<List[]>;
  constructor(private store: Store<fromRoot.State>) {}

  ngOnInit() {
    this.lists$ = this.store.pipe(select(cardwallSelectors.getLists));
  }

  closeTotals() {
    this.closeTotalRequested.emit();
  }
}
