import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Subscription, combineLatest } from 'rxjs';

import { fromRoot } from '@app/store';
import * as fromBacklog from '@app/backlog/state';
import * as cardActions from '@app/store/actions/card.actions';
import * as fromUI from '@app/store/actions/ui.actions';
import * as backlogCardActions from '@app/backlog/state/actions/plan-card.actions';
import { Card, List, Plan, SignalRResult } from '@app/models';
import { CardService } from '@app/app-services';
import { getRelativeMoveCardId, moveItemInArray } from '@app/utils';
import { filter, findIndex, findLast, last } from 'lodash';

@Component({
  selector: 'td-backlog-move-toolbar',
  templateUrl: './backlog-move-toolbar.component.html',
  styleUrls: ['./backlog-move-toolbar.component.scss'],
})
export class BacklogMoveToolbarComponent implements OnInit, OnDestroy {
  selectedCard: Card;
  listWithSelectedCard: List;
  activeListsOnPlanWithSelectedCard: List[];
  plansLoaded: Plan[];
  subscriptions: Subscription = new Subscription();

  canMoveUp = false;
  canMoveDown = false;

  constructor(private store: Store<fromRoot.State>, private cardService: CardService) {}

  ngOnInit() {
    this.subscriptions.add(
      this.store.pipe(select(fromRoot.getSelectedCard)).subscribe(card => {
        this.onSelectedCard(card);
      }),
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  expandAllLists() {
    this.store.dispatch(new fromUI.ExpandAllLists());
  }

  collapseAllLists() {
    this.store.dispatch(new fromUI.CompressAllLists());
  }

  moveCardUp() {
    const index: number = findIndex(this.listWithSelectedCard.cards, card => card.id === this.selectedCard.id);
    // Moved Within same list
    if (index > 0) {
      this.cardService.moveCardUp(this.listWithSelectedCard, index);
    } else {
      const listIndex: number = this.activeListsOnPlanWithSelectedCard.indexOf(this.listWithSelectedCard);
      // Moved Within same plan
      if (listIndex > 0) {
        const selectedCardWithNewListId = { ...this.selectedCard, listId: this.activeListsOnPlanWithSelectedCard[listIndex - 1].id };
        const newIndex: number =
          this.activeListsOnPlanWithSelectedCard[listIndex - 1].cards.length === 0
            ? 0
            : this.activeListsOnPlanWithSelectedCard[listIndex - 1].cards.length + 1;
        this.subscriptions.add(
          this.cardService
            .moveCardToListInSameBoard(
              this.activeListsOnPlanWithSelectedCard[listIndex - 1].cards,
              selectedCardWithNewListId,
              this.listWithSelectedCard.id,
              newIndex,
            )
            // Placeholder
            .subscribe(res => {
              this.store.dispatch(new cardActions.CardSelected(res.item.card));
            }),
        );
      } else {
        // Move to new plan
        const planIndex = this.plansLoaded.findIndex(plan => plan.id === this.selectedCard.planId);
        const newList: List = findLast(this.plansLoaded[planIndex - 1].lists.filter(list => list.id !== 0 && list.active));
        const relativeMoveCardId = getRelativeMoveCardId(newList.cards, this.selectedCard, newList.cards.length + 1);
        this.subscriptions.add(
          this.cardService
            .moveCardOutsideProjectOrPlan(
              this.selectedCard,
              this.plansLoaded[planIndex - 1].projectId,
              this.plansLoaded[planIndex - 1].id,
              newList.id,
              relativeMoveCardId,
            )
            .subscribe(() => {
              this.store.dispatch(new cardActions.CardSelected(undefined));
            }),
        );
      }
    }
  }

  moveCardDown() {
    const index: number = findIndex(this.listWithSelectedCard.cards, card => card.id === this.selectedCard.id);
    // Move within same list
    if (index !== this.listWithSelectedCard.cards.length - 1) {
      this.cardService.moveCardDown(this.listWithSelectedCard, index);
    } else {
      const listIndex: number = this.activeListsOnPlanWithSelectedCard.indexOf(this.listWithSelectedCard);
      // Move within same plan
      if (listIndex !== this.activeListsOnPlanWithSelectedCard.length - 1) {
        const selectedCardWithNewListId = { ...this.selectedCard, listId: this.activeListsOnPlanWithSelectedCard[listIndex + 1].id };
        this.subscriptions.add(
          this.cardService
            .moveCardToListInSameBoard(
              this.activeListsOnPlanWithSelectedCard[listIndex + 1].cards,
              selectedCardWithNewListId,
              this.listWithSelectedCard.id,
              0,
            )
            .subscribe(res => {
              this.store.dispatch(new cardActions.CardSelected(res.item.card));
            }),
        );
      } else {
        // Move to new Plan
        const planIndex = this.plansLoaded.findIndex(plan => plan.id === this.selectedCard.planId);
        const newList: List = this.plansLoaded[planIndex + 1].lists[0];
        const relativeMoveCardId = getRelativeMoveCardId(newList.cards, this.selectedCard, 0);
        this.subscriptions.add(
          this.cardService
            .moveCardOutsideProjectOrPlan(
              this.selectedCard,
              this.plansLoaded[planIndex + 1].projectId,
              this.plansLoaded[planIndex + 1].id,
              newList.id,
              relativeMoveCardId,
            )
            .subscribe(() => {
              this.store.dispatch(new cardActions.CardSelected(undefined));
            }),
        );
      }
    }
  }

  moveCardToTop() {
    const index: number = this.plansLoaded.findIndex(plan => plan.id === this.selectedCard.planId);
    if (index === 0) {
      // Move within plan
      const listIndex: number = this.activeListsOnPlanWithSelectedCard.findIndex(list => list.id === this.selectedCard.listId);
      const cardIndex: number = this.activeListsOnPlanWithSelectedCard[listIndex].cards.findIndex(card => card.id === this.selectedCard.id);
      if (listIndex === 0) {
        const cards = moveItemInArray(this.activeListsOnPlanWithSelectedCard[0].cards, cardIndex, 0);
        this.cardService.moveCardWithInSameList(cards, 0);
      } else {
        // We need to 'physically' move the card. It's easy to move the card within the same list.
        // The move of the card is taken care of from the server if moved to a new project or plan.
        this.store.dispatch(
          new backlogCardActions.MoveCard({
            newList: this.activeListsOnPlanWithSelectedCard[0],
            card: this.selectedCard,
            top: true,
          }),
        );

        this.subscriptions.add(
          this.cardService
            .moveCardToListInSameBoard(this.activeListsOnPlanWithSelectedCard[0].cards, this.selectedCard, this.listWithSelectedCard.id, 0)
            .subscribe(),
        );
      }
    } else {
      const { projectId, id, lists } = this.plansLoaded[0];
      const topListOnBacklog: List = filter(lists, list => list.id !== 0 && list.active)[0];

      const relativeCardId = getRelativeMoveCardId(topListOnBacklog.cards, this.selectedCard, 0);

      this.subscriptions.add(
        this.cardService
          .moveCardOutsideProjectOrPlan(this.selectedCard, projectId, id, topListOnBacklog.id, relativeCardId)
          .subscribe(res => {
            this.store.dispatch(new cardActions.CardSelected(res.item.card));
          }),
      );
    }
  }

  moveCardToBottom() {
    const bottomMostPlanIndex: number = this.plansLoaded.length - 1;
    const index: number = this.plansLoaded.findIndex(plan => plan.id === this.selectedCard.planId);

    if (index === bottomMostPlanIndex) {
      // Move within plan
      const listIndex: number = this.activeListsOnPlanWithSelectedCard.findIndex(list => list.id === this.selectedCard.listId);
      const cardIndex: number = this.activeListsOnPlanWithSelectedCard[listIndex].cards.findIndex(card => card.id === this.selectedCard.id);
      const bottomMostListIndex: number = this.activeListsOnPlanWithSelectedCard.length - 1;
      if (listIndex === bottomMostListIndex) {
        const cards = moveItemInArray(
          this.activeListsOnPlanWithSelectedCard[bottomMostListIndex].cards,
          cardIndex,
          this.activeListsOnPlanWithSelectedCard[bottomMostListIndex].cards.length,
        );
        this.cardService.moveCardWithInSameList(cards, cards.length - 1);
      } else {
        // We need to 'physically' move the card. It's easy to move the card within the same list.
        // The move of the card is taken care of from the server if moved to a new project or plan.
        this.store.dispatch(
          new backlogCardActions.MoveCard({
            newList: this.activeListsOnPlanWithSelectedCard[bottomMostListIndex],
            card: this.selectedCard,
            top: false,
          }),
        );

        this.subscriptions.add(
          this.cardService
            .moveCardToListInSameBoard(
              this.activeListsOnPlanWithSelectedCard[bottomMostListIndex].cards,
              this.selectedCard,
              this.listWithSelectedCard.id,
              this.activeListsOnPlanWithSelectedCard[bottomMostListIndex].cards.length - 1,
            )
            .subscribe(res => {
              this.store.dispatch(new cardActions.CardSelected(res.item.card));
            }),
        );
      }
    } else {
      const { projectId, id, lists } = this.plansLoaded[bottomMostPlanIndex];
      const bottomListOnBacklog: List = findLast(lists, list => list.id !== 0 && list.active);
      const relativeCardId = getRelativeMoveCardId(bottomListOnBacklog.cards, this.selectedCard, bottomListOnBacklog.cards.length);

      this.subscriptions.add(
        this.cardService
          .moveCardOutsideProjectOrPlan(this.selectedCard, projectId, id, bottomListOnBacklog.id, relativeCardId)
          .subscribe(res => {
            this.store.dispatch(new cardActions.CardSelected(res.item.card));
          }),
      );
    }
  }

  private onSelectedCard(selectedCard: Card) {
    this.selectedCard = selectedCard;
    if (this.selectedCard !== undefined) {
      this.subscriptions.add(
        combineLatest(
          this.store.pipe(select(fromBacklog.getListById(this.selectedCard.planId, this.selectedCard.listId))),
          this.store.pipe(select(fromBacklog.getPlanById(this.selectedCard.planId))),
          this.store.pipe(select(fromBacklog.getPlans)),
          (list, plan, plans) => {
            return { list, plan, plans };
          },
        ).subscribe(({ list, plan, plans }) => {
          this.listWithSelectedCard = list;
          this.activeListsOnPlanWithSelectedCard = [...plan.lists.filter(listInPlan => listInPlan.id !== 0 && listInPlan.active)];
          this.plansLoaded = plans;
          const cardIndex: number = list.cards.findIndex(card => card.id === this.selectedCard.id);
          const listIndex: number = this.activeListsOnPlanWithSelectedCard.findIndex(l => l.id === list.id);
          const planIndex: number = plans.findIndex(p => p.id === plan.id);

          this.canMoveUp = cardIndex > 0 || planIndex > 0 || listIndex > 0;

          // Cannot move down if last card in the list in the last plan
          this.canMoveDown =
            (cardIndex >= 0 && cardIndex < list.cards.length - 1) ||
            planIndex < plans.length - 1 ||
            listIndex < this.activeListsOnPlanWithSelectedCard.length - 1;
        }),
      );
    }
  }
}
