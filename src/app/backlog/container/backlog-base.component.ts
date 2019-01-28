import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromBacklog from '../state';
import * as backlogActions from '../state/backlog.actions';

import { PlanIdentifier } from '@app/models';

@Component({
  selector: 'app-backlog-base',
  templateUrl: './backlog-base.component.html',
  styleUrls: ['./backlog-base.component.scss'],
})
export class BacklogBaseComponent implements OnInit {
  projects = '';
  planIdentifiers$: Observable<PlanIdentifier[]>;
  errorMessage$: Observable<string>;

  constructor(private store: Store<fromBacklog.State>) {}

  ngOnInit() {
    this.store.dispatch(new backlogActions.GetAvailableBoards());

    this.planIdentifiers$ = this.store.pipe(select(fromBacklog.getPlans));
    this.errorMessage$ = this.store.pipe(select(fromBacklog.getPlansError));
  }
}
