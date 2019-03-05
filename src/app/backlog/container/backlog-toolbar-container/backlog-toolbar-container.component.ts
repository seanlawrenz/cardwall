import { Component, OnInit, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromBacklog from '@app/backlog/state';
import * as toolbarActions from '@app/backlog/state/actions/backlog-toolbar.actions';
import { Plan, Resources } from '@app/models';

import { flatten } from 'lodash';
import { uniqueCollectionsInCollection } from '@app/utils';

@Component({
  selector: 'td-backlog-toolbar-container',
  templateUrl: './backlog-toolbar-container.component.html',
  styleUrls: ['./backlog-toolbar-container.component.scss'],
})
export class BacklogToolbarContainerComponent implements OnInit {
  @Input() plans: Plan[];
  resources: Resources[] = [];
  showResources$: Observable<boolean>;
  showTotals$: Observable<boolean>;

  constructor(private store: Store<fromBacklog.BacklogState>) {}

  ngOnInit() {
    this.showResources$ = this.store.pipe(select(fromBacklog.showResources));
    this.showTotals$ = this.store.pipe(select(fromBacklog.showTotals));
    if (this.plans.length > 0) {
      this.getResourcesFromPlans();
    }
  }

  onShowResourcesRequested(show: boolean) {
    show === true ? this.store.dispatch(new toolbarActions.ShowResources()) : this.store.dispatch(new toolbarActions.HideToolbar());
  }

  onShowTotalsRequested(show: boolean) {
    show === true ? this.store.dispatch(new toolbarActions.ShowTotals()) : this.store.dispatch(new toolbarActions.HideToolbar());
  }

  private getResourcesFromPlans() {
    this.resources = uniqueCollectionsInCollection(flatten(this.plans.map(plan => plan.resources)), 'uid');
  }
}
