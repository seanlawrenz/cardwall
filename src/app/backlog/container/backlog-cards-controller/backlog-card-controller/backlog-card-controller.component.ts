import { Component, OnInit, Input } from '@angular/core';
import { Card, CardDetailsPageTypes, Plan, List } from '@app/models';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { fromRoot } from '@app/store';
import * as fromBacklog from '@app/backlog/state';
import * as cardActions from '@app/store/actions/card.actions';
import * as cardDetailActions from '@app/card-details/state/actions';

import { find, maxBy } from 'lodash';

@Component({
  selector: 'td-backlog-card-controller',
  templateUrl: './backlog-card-controller.component.html',
  styleUrls: ['./backlog-card-controller.component.scss'],
})
export class BacklogCardControllerComponent implements OnInit {
  @Input() card: Card;
  @Input() plan: Plan;
  @Input() isOdd: boolean;

  isCardSelected = false;

  // UI Settings
  showEstimateHours$: Observable<boolean>;
  showStoryPoints$: Observable<boolean>;

  constructor(private store: Store<fromRoot.State>) {}

  ngOnInit() {
    this.showEstimateHours$ = this.store.pipe(select(fromBacklog.showEstimateHours));
    this.showStoryPoints$ = this.store.pipe(select(fromBacklog.showStoryPoints));

    this.store.pipe(select(fromRoot.getSelectedCard)).subscribe(card => {
      if (card === undefined) {
        this.isCardSelected = false;
        return;
      }
      this.isCardSelected = card.id === this.card.id;
    });
  }

  selectCard() {
    this.store.dispatch(new cardActions.CardSelected(this.card));
  }

  showCardDetails(type: CardDetailsPageTypes) {
    this.store.dispatch(new cardDetailActions.CurrentCard({ card: this.card, plan: this.plan }));
    if (type === undefined || type === CardDetailsPageTypes.FORM) {
      this.store.dispatch(new cardDetailActions.ShowForm());
    } else if (type === CardDetailsPageTypes.SUBTASKS) {
      this.store.dispatch(new cardDetailActions.ShowSubtasks());
    }
  }

  archiveCard() {
    const archiveList: List = find(this.plan.lists, l => l.id === 0);
    const cardToArchive = { ...this.card };
    const maxOrderCard = (cards: Card[]): number => maxBy(cards, card => card.order).order + 1;

    const maxOrder = archiveList.cards.length > 0 ? maxOrderCard(archiveList.cards) : 1;
    cardToArchive.order = maxOrder;
    cardToArchive.listId = 0;

    this.store.dispatch(
      new fromBacklog.ArchiveCard({ card: cardToArchive, useRemainingHours: this.plan.useRemainingHours, originalCard: this.card }),
    );
  }
}
