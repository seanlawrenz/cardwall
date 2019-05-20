import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SortablejsOptions } from 'angular-sortablejs';
import { Board, List } from '@app/models';
import { ConfigService } from '@app/app-services';

@Component({
  selector: 'td-cardwall-lists-view',
  templateUrl: './cardwall-lists-view.component.html',
  styleUrls: ['./cardwall-lists-view.component.scss'],
})
export class CardwallListsViewComponent implements OnInit {
  @Input() board: Board;
  @Input() lists: List[];

  @Output() listReorderRequested = new EventEmitter<{ lists: List[]; resortedList: List }>();

  canEditPlans: boolean;

  sortableOptions: SortablejsOptions = {
    group: {
      name: 'cardwall-lists',
      pull: false,
    },
    filter: '.drag-disabled',
    handle: '.list-drag-handle',
    ghostClass: 'tdNg-backlog-dragging-overlay-blue',
    onStart: event => this.listDragStart(event),
    onMove: event => this.preventArchiveListFromBeingSorted(event),
    onEnd: event => this.listReorder(event),
  };

  constructor(private config: ConfigService) {}

  ngOnInit() {
    this.setPermissions();
  }

  listReorder(event) {
    const { oldIndex, newIndex, clone } = event;
    if (this.board.iAmProjectManager && this.canEditPlans) {
      if (oldIndex !== newIndex) {
        this.listReorderRequested.emit({ lists: this.lists, resortedList: <List>clone.resortedList });
      }
    }
  }

  listDragStart(event) {
    const { oldIndex, clone } = event;
    clone.resortedList = this.lists[oldIndex];
  }

  private setPermissions() {
    this.canEditPlans = this.config.config.CanEditPlans;

    this.sortableOptions.disabled = !this.canEditPlans && !this.board.iAmProjectManager;
  }

  private preventArchiveListFromBeingSorted(event: any): boolean {
    return !event.related.classList.contains('drag-disabled');
  }
}
