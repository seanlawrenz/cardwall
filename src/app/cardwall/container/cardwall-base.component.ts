import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';

import { fromRoot } from '@app/store';
import * as cardwallActions from '@app/cardwall/state/actions';
import * as cardwallSelectors from '@app/cardwall/state/selectors';
import * as rootActions from '@app/store/actions';
import * as rootSelectors from '@app/store/selectors';

import { Board } from '@app/models';

@Component({
  selector: 'app-cardwall-base',
  templateUrl: './cardwall-base.component.html',
  styleUrls: ['./cardwall-base.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardwallBaseComponent implements OnInit {
  board$: Observable<Board>;
  loading$: Observable<boolean>;
  saving$: Observable<boolean>;

  constructor(private store: Store<fromRoot.State>, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.store.dispatch(new cardwallActions.GetBoard());
    this.board$ = this.store.pipe(select(cardwallSelectors.getBoard));
    this.loading$ = this.store.pipe(select(cardwallSelectors.isBoardLoading));
    this.saving$ = this.store.pipe(select(cardwallSelectors.isSaving));
  }

  editBoard(board: Board) {
    this.store.dispatch(new cardwallActions.EditBoardName(board));
  }

  showOptions() {
    this.store.dispatch(new rootActions.ShowOptions());
  }
}
