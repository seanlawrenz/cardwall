import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { BacklogState } from '../state';
import * as backlogSelector from '../state/selectors';
import * as backlogActions from '../state/actions';
import { fromRoot } from '@app/store';
import * as rootActions from '@app/store/actions/ui.actions';
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

  constructor(private store: Store<BacklogState>, private appStore: Store<fromRoot.State>) {}

  ngOnInit() {
    this.getBoardsInParams();
  }

  getBoardsInParams() {
    this.store.dispatch(new backlogActions.GetPlansInParams());
    this.plans$ = this.store.pipe(select(backlogSelector.getPlans));
    this.boardsLoading$ = this.store.pipe(select(backlogSelector.isPlansLoading));
    this.errorMessage$ = this.store.pipe(select(backlogSelector.getPlansError));
  }

  showOptionsRequested() {
    this.store.dispatch(new rootActions.ShowOptions());
  }
}
