import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { fromRoot } from '@app/store';

import * as cardwallSelectors from '../../state/selectors';
import * as cardwallActions from '../../state/actions';
import * as carddeatilsActions from '@app/card-details/state/actions';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Board, Card } from '@app/models';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'td-card-base',
  templateUrl: './card-base.component.html',
  styleUrls: ['./card-base.component.scss'],
})
export class CardBaseComponent implements OnInit, OnDestroy {
  unsubscribe$ = new Subject<void>();

  board: Board;

  constructor(private store: Store<fromRoot.State>, private route: ActivatedRoute) {}

  ngOnInit() {
    this.store
      .select(cardwallSelectors.getBoard)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(board => {
        if (board) {
          this.board = board;
          const cardId: number = parseInt(this.route.snapshot.params.cardId, 10);
          let card: Card;
          this.board.lists.map(list => {
            list.cards.map(c => {
              if (c.id === cardId) {
                card = c;
                this.store.dispatch(new carddeatilsActions.CurrentCard({ card, plan: this.board }));
                const tab: string = this.route.snapshot.queryParams['tab'];
                if (tab) {
                  switch (tab) {
                    case 'feed':
                      this.store.dispatch(new carddeatilsActions.ShowFeed());
                      break;
                    case 'subtasks':
                      this.store.dispatch(new carddeatilsActions.ShowSubtasks());
                      break;
                    case 'work':
                      this.store.dispatch(new carddeatilsActions.ShowWork());
                      break;
                    case 'attachments':
                      this.store.dispatch(new carddeatilsActions.ShowAttachments());
                      break;
                    case 'issues':
                      this.store.dispatch(new carddeatilsActions.ShowIssues());
                      break;
                    case 'code':
                      this.store.dispatch(new carddeatilsActions.ShowCode());
                      break;

                    default:
                      this.store.dispatch(new carddeatilsActions.ShowForm());
                  }
                } else {
                  this.store.dispatch(new carddeatilsActions.ShowForm());
                }
              }
            });
          });
        }
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
