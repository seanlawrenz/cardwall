import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromBacklog from '@app/backlog/state';
import * as toolbarActions from '@app/backlog/state/actions/backlog-toolbar.actions';

@Component({
  selector: 'td-backlog-toolbar-container',
  templateUrl: './backlog-toolbar-container.component.html',
  styleUrls: ['./backlog-toolbar-container.component.scss'],
})
export class BacklogToolbarContainerComponent implements OnInit {
  showResources$: Observable<boolean>;
  showTotals$: Observable<boolean>;
  showFeed$: Observable<boolean>;

  constructor(private store: Store<fromBacklog.BacklogState>) {}

  ngOnInit() {
    this.showResources$ = this.store.pipe(select(fromBacklog.showResources));
    this.showTotals$ = this.store.pipe(select(fromBacklog.showTotals));
    this.showFeed$ = this.store.pipe(select(fromBacklog.showFeed));
  }
}
