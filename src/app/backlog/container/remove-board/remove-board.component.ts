import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Plan } from '@app/models';

import { filter, split } from 'lodash';
import { Store } from '@ngrx/store';
import * as fromBacklog from '../../state';
import * as backlogActions from '../../state/backlog.actions';

@Component({
  selector: 'td-remove-board',
  templateUrl: './remove-board.component.html',
  styleUrls: ['./remove-board.component.scss'],
})
export class RemoveBoardComponent implements OnInit {
  @Input() plan: Plan;

  constructor(private route: ActivatedRoute, private router: Router, private store: Store<fromBacklog.State>) {}

  ngOnInit() {}

  removePlan() {
    const paramsToRemove = `${this.plan.projectId}_${this.plan.id}`;
    const currentparams = this.route.snapshot.queryParamMap.get('boards');
    const newParams = filter(split(currentparams, ','), pair => pair !== paramsToRemove);
    this.router.navigate([], { relativeTo: this.route, queryParams: { boards: newParams }, queryParamsHandling: 'merge' });
    this.store.dispatch(new backlogActions.RemoveBoard({ planId: this.plan.id }));
  }
}
