import { Component, OnInit, Input } from '@angular/core';
import { List } from '@app/models';
import { SortablejsOptions } from 'angular-sortablejs';

import { Store } from '@ngrx/store';
import * as fromBacklog from '../../state';

@Component({
  selector: 'td-backlog-list-controller',
  templateUrl: './backlog-list-controller.component.html',
  styleUrls: ['./backlog-list-controller.component.scss'],
})
export class BacklogListControllerComponent implements OnInit {
  @Input() lists: List[];
  @Input() projectId: number;
  @Input() planId: number;

  listsOnView: List[];

  constructor(private store: Store<fromBacklog.BacklogState>) {}

  sortableOptions: SortablejsOptions = {
    group: {
      name: 'backlog-lists',
      pull: false,
    },
    handle: '.list-drag-handle',
    ghostClass: 'tdNg-backlog-dragging-overlay-blue',
    onEnd: event => this.listReorder(event),
  };

  ngOnInit() {}

  listReorder(event) {
    const { newIndex, oldIndex } = event;
    if (newIndex !== oldIndex) {
      const payload = {
        projectId: this.projectId,
        planId: this.planId,
      };
      this.store.dispatch(new fromBacklog.ReorderListsOnPlans(payload));
    }
  }
}
