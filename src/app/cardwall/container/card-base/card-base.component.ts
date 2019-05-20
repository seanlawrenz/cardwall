import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { fromRoot } from '@app/store';

import * as cardwallSelectors from '../../state/selectors';
import * as cardDetailsActions from '@app/card-details/state/actions';
import * as cardDetailsSelectors from '@app/card-details/state/selectors';
import { takeUntil, filter } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Board, CardDetailsPageTypes } from '@app/models';

import { split } from 'lodash';

@Component({
  selector: 'td-card-base',
  templateUrl: './card-base.component.html',
  styleUrls: ['./card-base.component.scss'],
})
export class CardBaseComponent implements OnInit, OnDestroy {
  unsubscribe$ = new Subject<void>();
  board: Board;

  constructor(private store: Store<fromRoot.State>, private router: Router, private route: ActivatedRoute, private location: Location) {}

  ngOnInit() {
    this.store
      .pipe(
        select(cardwallSelectors.getSelectedTab),
        takeUntil(this.unsubscribe$),
        filter(val => val !== undefined),
      )
      .subscribe(({ card, board, tab }) => {
        this.board = board;
        this.store.dispatch(new cardDetailsActions.CurrentCard({ card, plan: board }));
        switch (tab) {
          case 'feed':
            this.store.dispatch(new cardDetailsActions.ShowFeed());
            break;
          case 'subtasks':
            this.store.dispatch(new cardDetailsActions.ShowSubtasks());
            break;
          case 'work':
            this.store.dispatch(new cardDetailsActions.ShowWork());
            break;
          case 'attachments':
            this.store.dispatch(new cardDetailsActions.ShowAttachments());
            break;
          case 'issues':
            this.store.dispatch(new cardDetailsActions.ShowIssues());
            break;
          case 'code':
            this.store.dispatch(new cardDetailsActions.ShowCode());
            break;
        }
        this.setUpDialogTabListener();
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  navOnDetailsHidden() {
    this.router.navigate([`cardwall/project/${this.board.projectId}/board/${this.board.id}`]);
  }

  private setUpDialogTabListener() {
    this.store
      .pipe(
        select(cardDetailsSelectors.getCardDetailsPage),
        takeUntil(this.unsubscribe$),
      )
      .subscribe((type: CardDetailsPageTypes) => {
        // User may be accessing the app from a bookmarked page that already specifies the page type.
        // This component's job is to react to the view not define the view
        // This resets the url to remove queryParams and set the route to the view.
        const baseUrl: string = split(this.router.url, '?').length > 1 ? split(this.router.url, '?')[0] : this.router.url;
        switch (type) {
          case CardDetailsPageTypes.FORM:
            this.location.go(`${baseUrl}`);
            break;

          case CardDetailsPageTypes.FEED:
            this.location.go(`${baseUrl}?tab=feed`);
            break;

          case CardDetailsPageTypes.SUBTASKS:
            this.location.go(`${baseUrl}?tab=subtasks`);
            break;

          case CardDetailsPageTypes.WORK:
            this.location.go(`${baseUrl}?tab=work`);
            break;

          case CardDetailsPageTypes.ATTACHMENTS:
            this.location.go(`${baseUrl}?tab=attachments`);
            break;

          case CardDetailsPageTypes.ISSUES:
            this.location.go(`${baseUrl}?tab=issues`);
            break;

          case CardDetailsPageTypes.CODE:
            this.location.go(`${baseUrl}?tab=code`);
            break;

          default:
            return;
        }
      });
  }
}
