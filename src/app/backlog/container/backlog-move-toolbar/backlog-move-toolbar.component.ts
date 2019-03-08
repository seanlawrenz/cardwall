import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { fromRoot } from '@app/store';
import * as fromBacklog from '@app/backlog/state';
import * as fromUI from '@app/store/actions/ui.actions';
import { Card } from '@app/models';

@Component({
  selector: 'td-backlog-move-toolbar',
  templateUrl: './backlog-move-toolbar.component.html',
  styleUrls: ['./backlog-move-toolbar.component.scss'],
})
export class BacklogMoveToolbarComponent implements OnInit, OnDestroy {
  selectedCard: Card;
  selectSub: Subscription;
  listSub: Subscription;
  planSub: Subscription;

  canMoveUp = false;
  canMoveDown = false;

  constructor(private store: Store<fromRoot.State>, private appStore: Store<fromRoot.State>) {}

  ngOnInit() {
    this.selectSub = this.appStore.pipe(select(fromRoot.getSelectedCard)).subscribe(card => {
      this.onSelectedCard(card);
    });
  }

  ngOnDestroy() {
    this.selectSub.unsubscribe();
    this.listSub.unsubscribe();
  }

  expandAllLists() {
    this.store.dispatch(new fromUI.ExpandAllLists());
  }

  collapseAllLists() {
    this.store.dispatch(new fromUI.CompressAllLists());
  }

  private onSelectedCard(card: Card) {
    this.selectedCard = card;
    if (this.selectedCard !== undefined) {
      this.listSub = this.store
        .pipe(select(fromBacklog.getListById(this.selectedCard.planId, this.selectedCard.listId)))
        .subscribe(list => {
          const cardIndex: number = list.cards.findIndex(c => c.id === card.id);

          this.canMoveDown = cardIndex >= 0 && cardIndex < list.cards.length - 1;

          this.canMoveUp = cardIndex > 0;
        });
    }
  }
}
