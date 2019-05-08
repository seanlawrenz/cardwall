import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { fromRoot } from '@app/store';
import * as actions from '@app/card-details/state/actions';
import * as selectors from '@app/card-details/state/selectors';
import * as uiActions from '@app/store/actions/ui.actions';

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

  isSlideInShown = false;

  constructor(private store: Store<fromRoot.State>, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.store.dispatch(new actions.FetchIssues(this.card));
    this.issues$ = this.store.pipe(select(selectors.getIssues));
    this.loading$ = this.store.pipe(select(selectors.isIssuesLoading));
    this.error$ = this.store.pipe(select(selectors.getIssuesErrors));
  }

  showSlideIn() {
    this.store.dispatch(new uiActions.ShowSlider());
    setTimeout(() => {
      this.isSlideInShown = true;
      this.cdr.markForCheck();
    }, 1);
  }

  hideSlideIn() {
    this.store.dispatch(new uiActions.HideSlider());
    setTimeout(() => {
      this.isSlideInShown = false;
    }, 500);
  }
}
