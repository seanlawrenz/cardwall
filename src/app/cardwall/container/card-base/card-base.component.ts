import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { fromRoot } from '@app/store';

import * as cardwallSelectors from '../../state/selectors';
import * as cardDetailsActions from '@app/card-details/state/actions';
import * as cardDetailsSelectors from '@app/card-details/state/selectors';
import { takeUntil, filter } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Board, Card } from '@app/models';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'td-card-base',
  templateUrl: './card-base.component.html',
  styleUrls: ['./card-base.component.scss'],
})
export class CardBaseComponent implements OnInit, OnDestroy {
  unsubscribe$ = new Subject<void>();
  board: Board;

  constructor(private store: Store<fromRoot.State>, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.store
      .pipe(
        select(cardwallSelectors.getSelectedTab),
        takeUntil(this.unsubscribe$),
        filter(val => val !== undefined),
      )
      .subscribe(({ card, board, tab }) => {
        this.board = board;
        this.store.dispatch(new cardDetailsActions.CurrentCard({ card, plan: board }));
        switch (tab) {
          case 'feed':
            this.store.dispatch(new cardDetailsActions.ShowFeed());
            break;
          case 'subtasks':
            this.store.dispatch(new cardDetailsActions.ShowSubtasks());
            break;
          case 'work':
            this.store.dispatch(new cardDetailsActions.ShowWork());
            break;
          case 'attachments':
            this.store.dispatch(new cardDetailsActions.ShowAttachments());
            break;
          case 'issues':
            this.store.dispatch(new cardDetailsActions.ShowIssues());
            break;
          case 'code':
            this.store.dispatch(new cardDetailsActions.ShowCode());
            break;
        }

        this.setUpDialogClosedListener();
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private setUpDialogClosedListener() {
    this.store
      .pipe(
        select(cardDetailsSelectors.detailsHidden),
        takeUntil(this.unsubscribe$),
        filter(hidden => hidden === true),
      )
      .subscribe(() => {
        this.router.navigate([`cardwall/project/${this.board.projectId}/board/${this.board.id}`]);
      });
  }
}
