import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Plan, List } from '@app/models';

@Component({
  selector: 'td-totals-ui',
  templateUrl: './totals-ui.component.html',
  styleUrls: ['./totals-ui.component.scss'],
})
export class TotalsUiComponent implements OnInit, OnChanges {
  @Input() plan: Plan;

  totalCards = 0;
  totalHours = 0;
  totalStoryPoints = 0;

  ngOnInit() {
    this.getTotals();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes.plan.firstChange) {
      this.getTotals();
    }
  }

  private getTotals() {
    let totalCards = 0;
    let totalStoryPoints = 0;
    let totalHours = 0;
    if (this.plan) {
      const activeLists: List[] = this.plan.lists.filter(list => list.active && list.id > 0);
      activeLists.map(list => {
        if (list.cards) {
          list.cards.map(card => {
            totalCards++;
            totalStoryPoints += card.storyPoints;
            totalHours += card.estimatedHours;
          });
        }
      });
    }

    this.totalCards = totalCards;
    this.totalStoryPoints = totalStoryPoints;
    this.totalHours = totalHours;
  }
}
