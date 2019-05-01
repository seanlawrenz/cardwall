import { Component, OnInit, Input } from '@angular/core';
import { List, Plan } from '@app/models';
import { SortablejsOptions } from 'angular-sortablejs';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { fromRoot } from '@app/store';
import * as fromBacklog from '../../state';

@Component({
  selector: 'td-backlog-list-controller',
  templateUrl: './backlog-list-controller.component.html',
  styleUrls: ['./backlog-list-controller.component.scss'],
})
export class BacklogListControllerComponent implements OnInit {
  @Input() lists: List[];
  @Input() projectId: number;
  @Input() plan: Plan;

  listsOnView: List[];
  showWIP$: Observable<boolean>;

  constructor(private store: Store<fromRoot.State>) {}

  sortableOptions: SortablejsOptions = {
    group: {
      name: 'backlog-lists',
      pull: false,
    },
    handle: '.list-drag-handle',
    ghostClass: 'tdNg-backlog-dragging-overlay-blue',
    onEnd: event => this.listReorder(event),
  };

  ngOnInit() {
    this.showWIP$ = this.store.pipe(select(fromBacklog.showWIPLimits));
  }

  listReorder(event) {
    const { newIndex, oldIndex } = event;
    if (newIndex !== oldIndex) {
      const payload = {
        projectId: this.projectId,
        planId: this.plan.id,
        lists: this.plan.lists,
      };
      this.store.dispatch(new fromBacklog.ReorderListsOnPlans(payload));
    }
  }

  addNewCard(list: List) {
    this.store.dispatch(new fromBacklog.AddCardToBacklog(list));
  }
}
