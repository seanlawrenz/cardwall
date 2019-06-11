import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { SortablejsOptions } from 'angular-sortablejs';
import { Board, List } from '@app/models';
import { ConfigService } from '@app/app-services';

@Component({
  selector: 'td-cardwall-lists-view',
  templateUrl: './cardwall-lists-view.component.html',
  styleUrls: ['./cardwall-lists-view.component.scss'],
})
export class CardwallListsViewComponent implements OnInit, OnChanges {
  @Input() board: Board;
  @Input() lists: List[];
  @Input() showInactiveLists: boolean;
  @Input() showArchivedCards: boolean;

  @Output() listReorderRequested = new EventEmitter<{ lists: List[]; resortedList: List }>();
  @Output() editListRequested = new EventEmitter<List>();
  @Output() addListRequested = new EventEmitter<List>();
  @Output() bulkDeleteCardsRequested = new EventEmitter<List>();

  canEditPlans: boolean;
  listsToDisplay: List[];

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
    this.setListsToDisplay(this.lists);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.showInactiveLists && !changes.showInactiveLists.firstChange) {
      this.setListsToDisplay(this.lists);
    }

    if (changes.showArchivedCards && !changes.showArchivedCards.firstChange) {
      this.setListsToDisplay(this.lists);
    }

    if (changes.lists && !changes.lists.firstChange) {
      this.setListsToDisplay(changes.lists.currentValue);
    }
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

  editList(list: List) {
    this.editListRequested.emit(list);
  }

  addList(list: List) {
    this.addListRequested.emit(list);
  }

  bulkDeleteCards(list: List) {
    this.bulkDeleteCardsRequested.emit(list);
  }

  private setPermissions() {
    this.canEditPlans = this.config.config.CanEditPlans;

    this.sortableOptions.disabled = !this.canEditPlans && !this.board.iAmProjectManager;
  }

  private preventArchiveListFromBeingSorted(event: any): boolean {
    return !event.related.classList.contains('drag-disabled');
  }

  private setListsToDisplay(lists: List[]) {
    this.listsToDisplay = lists.filter(list => {
      if (this.showArchivedCards && list.id === 0) {
        return list;
      } else if (list.id !== 0) {
        if (this.showInactiveLists) {
          return list;
        } else {
          if (list.active) {
            return list;
          }
        }
      }
    });
  }
}
