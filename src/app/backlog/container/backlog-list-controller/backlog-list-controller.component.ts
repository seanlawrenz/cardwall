import { Component, OnInit, Input } from '@angular/core';
import { List } from '@app/models';
import { SortablejsOptions } from 'angular-sortablejs';

@Component({
  selector: 'td-backlog-list-controller',
  templateUrl: './backlog-list-controller.component.html',
  styleUrls: ['./backlog-list-controller.component.scss'],
})
export class BacklogListControllerComponent implements OnInit {
  @Input() lists: List[];
  listsOnView: List[];

  constructor() {}

  sortableOptions: SortablejsOptions = {
    group: {
      name: 'backlog-lists',
      pull: false,
    },
    ghostClass: 'tdNg-backlog-dragging-overlay-blue',
    onEnd: event => this.listReorder(event),
  };

  ngOnInit() {}

  listReorder(event) {
    console.log('list reorder', this.lists);
  }
}
