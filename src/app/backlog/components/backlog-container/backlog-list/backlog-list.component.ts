import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import { fromRoot } from '@app/store';

import { List } from '@app/models';
import { ListService } from '@app/app-services/list.service';

@Component({
  selector: 'td-backlog-list',
  templateUrl: './backlog-list.component.html',
  styleUrls: ['./backlog-list.component.scss'],
})
export class BacklogListComponent implements OnInit, OnDestroy {
  @Input() list: List;
  @Input() isTicketToTaskEnabled: boolean;
  @Input() showWIPLimits: boolean;

  @Output() newCardRequested = new EventEmitter<List>();

  unsubscribe$ = new Subject<void>();
  isExpanded = true;
  ticketToTaskUrl;
  constructor(private store: Store<fromRoot.State>, private listService: ListService) {}

  ngOnInit() {
    this.store
      .select(fromRoot.isListsExpanded)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((expand: boolean) => {
        this.isExpanded = expand;
      });

    // Sets up the iframe dialog for converting a ticket to task
    this.ticketToTaskUrl = this.listService.ticketToTaskUrl(this.list);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  toggleExpanded() {
    this.isExpanded = this.isExpanded === true ? false : true;
  }

  addNewCard() {
    this.newCardRequested.emit(this.list);
  }
}
