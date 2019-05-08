import { Component, OnInit, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { fromRoot } from '@app/store';
import * as actions from '@app/card-details/state/actions';
import * as selectors from '@app/card-details/state/selectors';

import { Issue, ErrorFromSignalR, Card } from '@app/models';

@Component({
  selector: 'td-issues-base',
  templateUrl: './issues-base.component.html',
  styleUrls: ['./issues-base.component.scss'],
})
export class IssuesBaseComponent implements OnInit {
  @Input() card: Card;

  issues$: Observable<Issue[]>;
  loading$: Observable<boolean>;
  error$: Observable<ErrorFromSignalR>;

  constructor(private store: Store<fromRoot.State>) {}

  ngOnInit() {
    this.store.dispatch(new actions.FetchIssues(this.card));
    this.issues$ = this.store.pipe(select(selectors.getIssues));
    this.loading$ = this.store.pipe(select(selectors.isIssuesLoading));
    this.error$ = this.store.pipe(select(selectors.getIssuesErrors));
  }
}
