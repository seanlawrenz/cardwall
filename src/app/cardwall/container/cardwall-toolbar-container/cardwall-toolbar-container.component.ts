import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Board, Resources } from '@app/models';
import { Store, select } from '@ngrx/store';

import { fromRoot } from '@app/store';
import * as cardwallActions from '@app/cardwall/state/actions';
import * as cardwallSelectors from '@app/cardwall/state/selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'td-cardwall-toolbar-container',
  templateUrl: './cardwall-toolbar-container.component.html',
  styleUrls: ['./cardwall-toolbar-container.component.scss'],
})
export class CardwallToolbarContainerComponent implements OnInit, OnChanges {
  @Input() board: Board;

  showResources$: Observable<boolean>;

  resources: Resources[];

  constructor(private store: Store<fromRoot.State>) {}

  ngOnInit() {
    this.showResources$ = this.store.pipe(select(cardwallSelectors.showResources));
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.board && !changes.board.firstChange) {
      this.board = changes.board.currentValue;
    }
  }

  showResources(show: boolean) {
    if (show) {
      this.store.dispatch(new cardwallActions.ShowResources());
    } else {
      this.store.dispatch(new cardwallActions.HideToolbar());
    }
  }
}
