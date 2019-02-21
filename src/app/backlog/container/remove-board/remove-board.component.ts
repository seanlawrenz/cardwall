import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Plan } from '@app/models';

import { filter, join, split } from 'lodash';
import { Store } from '@ngrx/store';
import * as fromBacklog from '../../state';

@Component({
  selector: 'td-remove-board',
  templateUrl: './remove-board.component.html',
  styleUrls: ['./remove-board.component.scss'],
})
export class RemoveBoardComponent implements OnInit {
  @Input() plan: Plan;

  constructor(private route: ActivatedRoute, private router: Router, private store: Store<fromBacklog.BacklogState>) {}

  ngOnInit() {}

  removePlan() {
    const paramsToRemove = `${this.plan.projectId}_${this.plan.id}`;
    const currentparams = this.route.snapshot.queryParamMap.get('boards');
    const newParams = join(filter(split(currentparams, ','), pair => pair !== paramsToRemove), ',');
    this.router.navigate([], { relativeTo: this.route, queryParams: { boards: newParams }, queryParamsHandling: 'merge' });
    this.store.dispatch(new fromBacklog.RemovePlan({ planId: this.plan.id }));
  }
}
