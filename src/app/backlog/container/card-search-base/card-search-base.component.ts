import { Component, OnInit, SimpleChanges, OnChanges, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { fromRoot } from '@app/store';
import * as actions from '@app/backlog/state/actions';
import { Plan, Resources } from '@app/models';

import { flatMap } from 'lodash';
import { uniqueCollectionsInCollection } from '@app/utils';

@Component({
  selector: 'td-card-search-base',
  templateUrl: './card-search-base.component.html',
  styleUrls: ['./card-search-base.component.scss'],
})
export class CardSearchBaseComponent implements OnInit, OnChanges {
  constructor(private store: Store<fromRoot.State>) {}
  @Input() plans: Plan[];
  resources: Resources[];

  ngOnInit() {
    this.resources = this.setResources(this.plans);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.plans && !changes.plans.firstChange) {
      this.resources = this.setResources(changes.plans.currentValue);
    }
  }

  searchCardsViaText(term) {
    this.store.dispatch(new actions.SearchPlans(term));
  }

  searchCardsViaResources(resources: Resources[]) {
    this.store.dispatch(new actions.SearchPlans(resources));
  }

  private setResources(plans: Plan[]): Resources[] {
    return uniqueCollectionsInCollection(
      flatMap(
        plans.map(plan => {
          return plan.resources;
        }),
      ),
      'uid',
    );
  }
}
