import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import * as fromBacklog from '../state';
import * as backlogActions from '../state/backlog.actions';
import { Plan } from '@app/models';

@Component({
  selector: 'app-backlog-base',
  templateUrl: './backlog-base.component.html',
  styleUrls: ['./backlog-base.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BacklogBaseComponent implements OnInit {
  plans$: Observable<Plan[]>;
  boardsLoading$: Observable<boolean>;
  errorMessage$: Observable<string>;
  routerSubscription: Subscription;

  constructor(private store: Store<fromBacklog.State>) {}

  ngOnInit() {
    this.getBoardsInParams();
  }

  getBoardsInParams() {
    this.store.dispatch(new backlogActions.GetPlansInParams());
    this.plans$ = this.store.pipe(select(fromBacklog.getBoards));
    this.boardsLoading$ = this.store.pipe(select(fromBacklog.isBoardsLoading));
    this.errorMessage$ = this.store.pipe(select(fromBacklog.getPlansError));
  }
}
