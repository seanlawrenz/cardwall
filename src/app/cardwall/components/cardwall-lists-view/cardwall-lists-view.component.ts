import { Component, OnInit, Input } from '@angular/core';
import { SortablejsOptions } from 'angular-sortablejs';
import { Board, List } from '@app/models';

@Component({
  selector: 'td-cardwall-lists-view',
  templateUrl: './cardwall-lists-view.component.html',
  styleUrls: ['./cardwall-lists-view.component.scss'],
})
export class CardwallListsViewComponent implements OnInit {
  @Input() board: Board;
  @Input() lists: List[];

  sortableOptions: SortablejsOptions = {
    group: {
      name: 'cardwall-lists',
      pull: false,
    },
    handle: '.list-drag-handle',
    ghostClass: 'tdNg-backlog-dragging-overlay-blue',
  };

  constructor() {}

  ngOnInit() {}
}
