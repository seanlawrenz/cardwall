import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Plan, List } from '@app/models';

@Component({
  selector: 'td-backlog-totals',
  templateUrl: './backlog-totals.component.html',
  styleUrls: ['./backlog-totals.component.scss'],
})
export class BacklogTotalsComponent implements OnInit, OnChanges {
  @Input() plans: Plan[];
  @Output() closeTotalsRequested = new EventEmitter<void>();

  totalCards = 0;
  totalHours = 0;
  totalStoryPoints = 0;

  ngOnInit() {
    this.getTotals();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes.plans.firstChange) {
      this.getTotals();
    }
  }

  closeTotals() {
    this.closeTotalsRequested.emit();
  }

  private getTotals() {
    let totalCards = 0;
    let totalStoryPoints = 0;
    let totalHours = 0;
    if (this.plans.length > 0) {
      this.plans.map(plan => {
        const activeLists: List[] = plan.lists.filter(list => list.active && list.id > 0);
        activeLists.map(list => {
          if (list.cards.length > 0) {
            list.cards.map(card => {
              totalCards++;
              totalStoryPoints += card.storyPoints;
              totalHours += card.estimatedHours;
            });
          }
        });
      });
    }
    this.totalCards = totalCards;
    this.totalHours = totalHours;
    this.totalStoryPoints = totalStoryPoints;
  }
}
