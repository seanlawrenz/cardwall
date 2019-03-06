import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Plan, Resources, Card } from '@app/models';
import { Store, select } from '@ngrx/store';

import { fromRoot } from '@app/store';

import { flatten } from 'lodash';
import { uniqueCollectionsInCollection } from '@app/utils';
import { Observable } from 'rxjs';

@Component({
  selector: 'td-backlog-resource-controller',
  templateUrl: './backlog-resource-controller.component.html',
  styleUrls: ['./backlog-resource-controller.component.scss'],
})
export class BacklogResourceControllerComponent implements OnInit, OnChanges {
  @Input() plans: Plan[];
  @Output() showResourcesRequested = new EventEmitter<void>();

  selectedCard$: Observable<Card>;
  resources: Resources[];

  constructor(private store: Store<fromRoot.State>) {}

  ngOnInit() {
    this.getResourcesFromPlans();
    this.selectedCard$ = this.store.pipe(select(fromRoot.getSelectedCard));
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes.plans.firstChange) {
      this.getResourcesFromPlans();
    }
  }

  changeShowResources() {
    this.showResourcesRequested.emit();
  }

  private getResourcesFromPlans() {
    this.resources = uniqueCollectionsInCollection(flatten(this.plans.map(plan => plan.resources)), 'uid');
  }
}
