import { Component, OnInit, OnChanges, Input, OnDestroy } from '@angular/core';

import { Store, select } from '@ngrx/store';
import { fromRoot } from '@app/store';
import { Subscription } from 'rxjs';

import { Card, List, Plan } from '@app/models';

import { flatMap, flatMapDeep, sum } from 'lodash';
import { ConfigService } from '@app/app-services';

@Component({
  selector: 'td-backlog-board-header',
  templateUrl: './backlog-board-header.component.html',
  styleUrls: ['./backlog-board-header.component.scss'],
})
export class BacklogBoardHeaderComponent implements OnInit, OnChanges, OnDestroy {
  @Input() plan: Plan;

  expandedSub: Subscription;
  isExpanded = true;

  cardCount = 0;
  estimatedHours = 0;
  storyPoints = 0;

  constructor(private configService: ConfigService, private store: Store<fromRoot.State>) {}

  ngOnInit() {
    this.updateSummaryData();
    this.expandedSub = this.store.pipe(select(fromRoot.isBoardsExpanded)).subscribe((expand: boolean) => {
      this.isExpanded = expand;
    });
  }

  ngOnChanges() {
    this.updateSummaryData();
  }

  ngOnDestroy() {
    this.expandedSub.unsubscribe();
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

  getProjectUrl() {
    return `${this.configService.config.BasePath}/Apps/Projects/TeamManagement/ProjectDetails.aspx?PID=${this.plan.projectId}`;
  }

  getCardwallUrl() {
    return `${this.configService.config.BasePath}/Apps/Projects/Agile/cardwall/project/${this.plan.projectId}/board/${this.plan.id}`;
  }

  toggleExpanded() {
    this.isExpanded = this.isExpanded === true ? false : true;
  }
}
