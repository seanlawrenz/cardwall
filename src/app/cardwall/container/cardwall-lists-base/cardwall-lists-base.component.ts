import { Component, OnInit } from '@angular/core';
import { List, Board, ErrorFromSignalR } from '@app/models';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { fromRoot } from '@app/store';
import * as cardwallActions from '@app/cardwall/state/actions';
import * as cardwallSelectors from '@app/cardwall/state/selectors';

@Component({
  selector: 'td-cardwall-lists-base',
  templateUrl: './cardwall-lists-base.component.html',
  styleUrls: ['./cardwall-lists-base.component.scss'],
})
export class CardwallListsBaseComponent implements OnInit {
  board$: Observable<Board>;
  lists$: Observable<List[]>;
  error$: Observable<ErrorFromSignalR>;
  saving$: Observable<boolean>;
  showInactiveLists$: Observable<boolean>;
  showArchiveCards$: Observable<boolean>;

  constructor(private store: Store<fromRoot.State>) {}

  ngOnInit() {
    this.board$ = this.store.pipe(select(cardwallSelectors.getBoard));
    this.lists$ = this.store.pipe(select(cardwallSelectors.getLists));
    this.error$ = this.store.pipe(select(cardwallSelectors.getListsError));
    this.saving$ = this.store.pipe(select(cardwallSelectors.isListSaving));
    this.showInactiveLists$ = this.store.pipe(select(cardwallSelectors.showInactiveLists));
    this.showArchiveCards$ = this.store.pipe(select(cardwallSelectors.showArchivedCards));
  }

  listReorder(info: { lists: List[]; resortedList: List }) {
    this.store.dispatch(new cardwallActions.ReorderLists(info));
  }

  editList(list: List) {
    this.store.dispatch(new cardwallActions.EditList(list));
  }

  addList(list: List) {
    this.store.dispatch(new cardwallActions.AddList(list));
  }
}
