import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { fromRoot } from '@app/store';
import * as fromBacklog from '../state';
import * as backlogActions from '../state/backlog.actions';
import { Board } from '@app/models';

@Component({
  selector: 'app-backlog-base',
  templateUrl: './backlog-base.component.html',
  styleUrls: ['./backlog-base.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BacklogBaseComponent implements OnInit, OnDestroy {
  boards$: Observable<Board[]>;
  routerSubscription: Subscription;

  constructor(private store: Store<fromBacklog.State>, private rootStore: Store<fromRoot.State>) {}

  ngOnInit() {
    this.getBoardsInParams();
    this.routerSubscription = this.rootStore.select('router', 'state', 'queryParams').subscribe(() => {
      this.getBoardsInParams();
    });
  }

  ngOnDestroy() {
    this.routerSubscription.unsubscribe();
  }

  getBoardsInParams() {
    this.store.dispatch(new backlogActions.GetBoardsInParams());
    this.boards$ = this.store.pipe(select(fromBacklog.getBoards));
  }
}
