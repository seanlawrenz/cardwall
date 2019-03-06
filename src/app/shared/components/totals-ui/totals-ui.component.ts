import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Plan, List } from '@app/models';

@Component({
  selector: 'td-totals-ui',
  templateUrl: './totals-ui.component.html',
  styleUrls: ['./totals-ui.component.scss'],
})
export class TotalsUiComponent implements OnInit, OnChanges {
  @Input() plans: Plan[];

  metaPlans: Array<{ plan: Plan; totalCards: number; totalStoryPoints: number; totalHours: number }>;

  ngOnInit() {
    this.getTotals();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes.plans.firstChange) {
      this.getTotals();
    }
  }

  private getTotals() {
    const updateTotalsAtListLevel = lists => {
      let totalCards = 0;
      let totalStoryPoints = 0;
      let totalHours = 0;
      const activeLists: List[] = lists.filter(list => list.active && list.id > 0);
      activeLists.map(list => {
        if (list.cards) {
          list.cards.map(card => {
            totalCards++;
            totalStoryPoints += card.storyPoints;
            totalHours += card.estimatedHours;
          });
        }
      });
      return {
        totalCards,
        totalStoryPoints,
        totalHours,
      };
    };

    if (this.plans && this.plans.length > 0) {
      this.metaPlans = [];
      this.plans.map(plan => {
        const metaData = updateTotalsAtListLevel(plan.lists);
        this.metaPlans.push({
          plan: { ...plan },
          totalCards: metaData.totalCards,
          totalHours: metaData.totalHours,
          totalStoryPoints: metaData.totalStoryPoints,
        });
      });
    }
  }
}
