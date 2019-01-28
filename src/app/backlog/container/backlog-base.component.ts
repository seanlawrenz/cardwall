import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { fromRoot } from '@app/store';
import * as fromBacklog from '../state';
import * as backlogActions from '../state/backlog.actions';

import { PlanIdentifier } from '@app/models';

@Component({
  selector: 'app-backlog-base',
  templateUrl: './backlog-base.component.html',
  styleUrls: ['./backlog-base.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BacklogBaseComponent implements OnInit {
  projects = '';
  planIdentifiers$: Observable<PlanIdentifier[]>;
  errorMessage$: Observable<string>;
  loading$: Observable<boolean>;

  constructor(private store: Store<fromBacklog.State>, private appStore: Store<fromRoot.State>) {}

  ngOnInit() {
    this.store.dispatch(new backlogActions.GetAvailableBoards());

    this.planIdentifiers$ = this.store.pipe(select(fromBacklog.getPlans));
    this.errorMessage$ = this.store.pipe(select(fromBacklog.getPlansError));
    this.loading$ = this.appStore.pipe(select(fromRoot.isLoading));
  }

  addCardWallsToBacklog(plans: PlanIdentifier[]) {
    console.log(plans);
  }
}
