import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';

import { Store } from '@ngrx/store';
import { fromRoot } from '@app/store';
import * as fromCardDetails from '@app/card-details/state';
import * as actions from '@app/card-details/state/actions';

import { Card, Plan, Board, List, Project } from '@app/models';

import { Observable, Subscription } from 'rxjs';
import { upperFirst } from 'lodash';
import { map } from 'rxjs/operators';
import { NotificationService } from '@app/app-services';

@Component({
  selector: 'td-copy-move-card',
  templateUrl: './copy-move-card.component.html',
  styleUrls: ['./copy-move-card.component.scss'],
})
export class CopyMoveCardComponent implements OnInit, OnDestroy {
  @Input() card: Card;
  @Input() plan: Plan | Board;
  @Input() mode: string;

  projects$: Observable<Project[]>;
  plans$: Observable<Plan[]>;
  lists$: Observable<List[]>;
  loading$: Observable<boolean>;
  plansLoading$: Observable<boolean>;
  listsLoading$: Observable<boolean>;
  subs$: Subscription = new Subscription();
  error$: Observable<any>;

  @Output() closeCopyMoveSlider = new EventEmitter<void>();

  isTemplate: boolean;

  constructor(private store: Store<fromRoot.State>, private notify: NotificationService) {}

  ngOnInit() {
    const isTemplate = this.plan.isTemplate;
    this.store.dispatch(new actions.GetProjects({ isTemplate }));

    this.projects$ = this.store.select(fromCardDetails.getProjects);
    this.plans$ = this.store.select(fromCardDetails.getPlans);
    this.lists$ = this.store.select(fromCardDetails.getLists);
    this.loading$ = this.store.select(fromCardDetails.getCopyMoveLoading);
    this.plansLoading$ = this.store.select(fromCardDetails.getPlansLoading);
    this.listsLoading$ = this.store.select(fromCardDetails.getListsLoading);
    this.error$ = this.store.select(fromCardDetails.getError).pipe(map(error => console.log(error)));
    this.subs$.add(this.store.select(fromCardDetails.getCopyMoveResult).subscribe(card => this.cardMoveFinished(card)));
  }

  ngOnDestroy() {
    this.subs$.unsubscribe();
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

  copyMoveCard({ projectId, planId, listId }) {
    this.store.dispatch(new actions.CopyMoveCard({ card: this.card, projectId, planId, listId, type: this.mode }));
  }

  cardMoveFinished(card: Card) {
    if (card === undefined) {
      return;
    }
    if (this.mode === 'move') {
      if (card) {
        this.notify.success('Card moved', `${card.name} moved successfully`, 4);
      }

      this.store.dispatch(new actions.HideDetails());
    }
  }
}
