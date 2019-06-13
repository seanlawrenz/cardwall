import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Board, List } from '@app/models';

@Component({
  selector: 'td-totals-view',
  templateUrl: './totals-view.component.html',
  styleUrls: ['./totals-view.component.scss'],
})
export class TotalsViewComponent implements OnInit, OnChanges {
  @Input() lists: List[];

  @Output() closeTotalsRequested = new EventEmitter<void>();

  totalCards: number;
  totalEstHours: number;
  totalStoryPoints: number;

  ngOnInit() {
    this.getListsTotals(this.lists);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.lists && !changes.lists.firstChange) {
      this.getListsTotals(changes.lists.currentValue);
    }
  }

  closePane() {
    this.closeTotalsRequested.emit();
  }

  getTotalListHours(list: List): number {
    let hours = 0;
    list.cards.map(card => {
      hours += card.estimatedHours;
    });
    return hours;
  }

  getTotalStoryPoints(list: List): number {
    let points = 0;
    list.cards.map(card => {
      points += card.storyPoints;
    });
    return points;
  }

  private getListsTotals(lists: List[]) {
    this.totalCards = 0;
    this.totalEstHours = 0;
    this.totalStoryPoints = 0;

    lists.map(list => {
      if (list.id > 0 && list.active) {
        this.totalCards += list.cards.length;
        list.cards.map(card => {
          this.totalEstHours += card.estimatedHours;
          this.totalStoryPoints += card.storyPoints;
        });
      }
    });
  }
}
