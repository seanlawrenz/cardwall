import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { List } from '@app/models';

import { Store, select } from '@ngrx/store';
import { fromRoot } from '@app/store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'td-backlog-list',
  templateUrl: './backlog-list.component.html',
  styleUrls: ['./backlog-list.component.scss'],
})
export class BacklogListComponent implements OnInit, OnDestroy {
  @Input() list: List;
  @Input() showWIPLimits: boolean;
  expandedSub: Subscription;
  isExpanded = true;

  constructor(private store: Store<fromRoot.State>) {}

  ngOnInit() {
    this.expandedSub = this.store.pipe(select(fromRoot.isListsExpanded)).subscribe((expand: boolean) => {
      this.isExpanded = expand;
    });
  }

  ngOnDestroy() {
    this.expandedSub.unsubscribe();
  }

  toggleExpanded() {
    this.isExpanded = this.isExpanded === true ? false : true;
  }
}
