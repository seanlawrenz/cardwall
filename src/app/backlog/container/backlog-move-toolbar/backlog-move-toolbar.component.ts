import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Subscription, combineLatest } from 'rxjs';

import { fromRoot } from '@app/store';
import * as fromBacklog from '@app/backlog/state';
import * as cardActions from '@app/store/actions/card.actions';
import * as fromUI from '@app/store/actions/ui.actions';
import { Card, List, Plan, SignalRResult } from '@app/models';
import { CardService } from '@app/app-services';
import { getRelativeMoveCardId } from '@app/utils';
import { findLast } from 'lodash';

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
  selectSub: Subscription;
  selectedSub: Subscription;

  canMoveUp = false;
  canMoveDown = false;

  constructor(private store: Store<fromRoot.State>, private cardService: CardService) {}

  ngOnInit() {
    this.selectSub = this.store.pipe(select(fromRoot.getSelectedCard)).subscribe(card => {
      this.onSelectedCard(card);
    });
  }

  ngOnDestroy() {
    if (this.selectSub) {
      this.selectSub.unsubscribe();
    }
    if (this.selectedSub) {
      this.selectedSub.unsubscribe();
    }
  }

  expandAllLists() {
    this.store.dispatch(new fromUI.ExpandAllLists());
  }

  collapseAllLists() {
    this.store.dispatch(new fromUI.CompressAllLists());
  }

  moveCardUp() {
    const index: number = this.listWithSelectedCard.cards.indexOf(this.selectedCard);
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
          });
      } else {
        // Move to new plan
        const planIndex = this.plansLoaded.findIndex(plan => plan.id === this.selectedCard.planId);
        const newList: List = findLast(this.plansLoaded[planIndex - 1].lists.filter(list => list.id !== 0 && list.active));
        const relativeMoveCardId = getRelativeMoveCardId(newList.cards, this.selectedCard, newList.cards.length + 1);
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
          });
      }
    }
  }

  moveCardDown() {
    const index: number = this.listWithSelectedCard.cards.findIndex(card => card.id === this.selectedCard.id);
    // Move within same list
    if (index !== this.listWithSelectedCard.cards.length - 1) {
      this.cardService.moveCardDown(this.listWithSelectedCard, index);
    } else {
      const listIndex: number = this.activeListsOnPlanWithSelectedCard.indexOf(this.listWithSelectedCard);
      // Move within same plan
      if (listIndex !== this.activeListsOnPlanWithSelectedCard.length - 1) {
        const selectedCardWithNewListId = { ...this.selectedCard, listId: this.activeListsOnPlanWithSelectedCard[listIndex + 1].id };
        this.cardService
          .moveCardToListInSameBoard(
            this.activeListsOnPlanWithSelectedCard[listIndex + 1].cards,
            selectedCardWithNewListId,
            this.listWithSelectedCard.id,
            0,
          )
          .subscribe(res => {
            this.store.dispatch(new cardActions.CardSelected(res.item.card));
          });
      } else {
        // Move to new Plan
        const planIndex = this.plansLoaded.findIndex(plan => plan.id === this.selectedCard.planId);
        const newList: List = this.plansLoaded[planIndex + 1].lists[0];
        const relativeMoveCardId = getRelativeMoveCardId(newList.cards, this.selectedCard, 0);
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
          });
      }
    }
  }

  moveCardToTop() {
    console.log('move Card To top');
  }

  moveCardToBottom() {
    console.log('move Card To Bottom');
  }

  private onSelectedCard(selectedCard: Card) {
    this.selectedCard = selectedCard;
    if (this.selectedCard !== undefined) {
      this.selectedSub = combineLatest(
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
      });
    }
  }
}
