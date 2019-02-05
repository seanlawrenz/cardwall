import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { Plan } from '@app/models';

import { Card, List } from '@app/models';

import { flatMap, flatMapDeep, sum } from 'lodash';

@Component({
  selector: 'td-backlog-board-header',
  templateUrl: './backlog-board-header.component.html',
  styleUrls: ['./backlog-board-header.component.scss'],
})
export class BacklogBoardHeaderComponent implements OnInit, OnChanges {
  @Input() plan: Plan;
  cardCount = 0;
  estimatedHours = 0;
  storyPoints = 0;

  constructor() {}

  ngOnInit() {
    this.updateSummaryData();
  }

  ngOnChanges() {
    this.updateSummaryData();
  }

  updateSummaryData() {
    if (!this.plan || this.plan.lists.length === 0) {
      return;
    }

    const sumArray = (arrayOfNumbers: number[]) => sum(arrayOfNumbers);
    const flatPlanCards = (lists: List[]) => flatMap(lists.map(list => list.cards));
    const flatPlanCardsLength = (lists: List[]) => flatMapDeep(lists.map(list => list.cards.length));
    const flatMapHours = (cards: Card[]) => flatMapDeep(cards.map(card => card.estimatedHours));
    const flatMapStoryPoints = (cards: Card[]) => flatMapDeep(cards.map(card => card.storyPoints));

    const activeLists = this.plan.lists.filter(list => list.active && list.id > 0);
    this.cardCount = sumArray(flatPlanCardsLength(activeLists));
    this.estimatedHours = sumArray(flatMapHours(flatPlanCards(activeLists)));
    this.storyPoints = sumArray(flatMapStoryPoints(flatPlanCards(activeLists)));
  }
}
