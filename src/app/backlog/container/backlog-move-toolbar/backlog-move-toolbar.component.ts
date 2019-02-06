import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { fromRoot } from '@app/store';
import * as fromUI from '@app/store/actions/ui.actions';

@Component({
  selector: 'td-backlog-move-toolbar',
  templateUrl: './backlog-move-toolbar.component.html',
  styleUrls: ['./backlog-move-toolbar.component.scss'],
})
export class BacklogMoveToolbarComponent implements OnInit {
  constructor(private store: Store<fromRoot.State>) {}

  ngOnInit() {}

  expandAllLists() {
    this.store.dispatch(new fromUI.ExpandAllLists());
  }

  collapseAllLists() {
    this.store.dispatch(new fromUI.CompressAllLists());
  }
}
