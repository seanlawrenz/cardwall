import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Store } from '@ngrx/store';
import { fromRoot } from '@app/store';
import * as fromCardDetails from '@app/card-details/state';
import * as actions from '@app/card-details/state/actions';

import { Card, Plan, Board, List, Project } from '@app/models';

import { Observable } from 'rxjs';
import { upperFirst } from 'lodash';

@Component({
  selector: 'td-copy-move-card',
  templateUrl: './copy-move-card.component.html',
  styleUrls: ['./copy-move-card.component.scss'],
})
export class CopyMoveCardComponent implements OnInit {
  @Input() card: Card;
  @Input() plan: Plan | Board;
  @Input() mode: string;

  projects$: Observable<Project[]>;
  plans$: Observable<Plan[]>;
  lists$: Observable<List[]>;
  loading$: Observable<boolean>;
  plansLoading$: Observable<boolean>;
  listsLoading$: Observable<boolean>;

  @Output() closeCopyMoveSlider = new EventEmitter<void>();

  isTemplate: boolean;

  constructor(private store: Store<fromRoot.State>) {}

  ngOnInit() {
    const isTemplate = this.plan.isTemplate;
    this.store.dispatch(new actions.GetProjects({ isTemplate }));

    this.projects$ = this.store.select(fromCardDetails.getProjects);
    this.plans$ = this.store.select(fromCardDetails.getPlans);
    this.lists$ = this.store.select(fromCardDetails.getLists);
    this.loading$ = this.store.select(fromCardDetails.getCopyMoveLoading);
    this.plansLoading$ = this.store.select(fromCardDetails.getPlansLoading);
    this.listsLoading$ = this.store.select(fromCardDetails.getListsLoading);
  }

  fetchPlans(event) {
    this.store.dispatch(new actions.GetPlans({ projectID: event }));
  }

  fetchLists(event: { projectId: number; planId: number }) {
    this.store.dispatch(new actions.GetLists({ projectId: event.projectId, planId: event.planId }));
  }

  hide() {
    this.closeCopyMoveSlider.emit();
  }
}
