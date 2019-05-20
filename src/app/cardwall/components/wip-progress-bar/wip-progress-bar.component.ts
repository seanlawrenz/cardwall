import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { List, ListLimit } from '@app/models';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'td-wip-progress-bar',
  templateUrl: './wip-progress-bar.component.html',
  styleUrls: ['./wip-progress-bar.component.scss'],
})
export class WipProgressBarComponent implements OnInit, OnChanges {
  @Input() list: List;

  isLimit: boolean;

  ngOnInit() {
    this.setIsLimit();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.list && !changes.list.firstChange) {
      this.setIsLimit();
    }
  }

  isWIPLimitViolated(): boolean {
    if (!this.isLimit) {
      return false;
    }
    const limit: ListLimit = this.list.limits[0];
    const cardLength = this.list.cards.length;
    const isMax = !isNullOrUndefined(limit.maxValue);
    const isMin = !isNullOrUndefined(limit.minValue);

    if (isMin && limit.minValue > cardLength) {
      return true;
    }

    if (isMax && limit.maxValue < cardLength) {
      return true;
    }

    return false;
  }

  getProgressValue(): number {
    if (!this.isLimit) {
      return;
    }

    const limit: ListLimit = this.list.limits[0];
    const numCards: number = this.list.cards.length;
    const isMax: boolean = !isNullOrUndefined(limit.maxValue);
    const isMin: boolean = !isNullOrUndefined(limit.minValue);

    if (isMin && !isMax) {
      if (limit.minValue === 0) {
        return 100;
      } else {
        return numCards / limit.minValue > 1 ? 100 : (numCards / limit.minValue) * 100;
      }
    } else if (isMax) {
      if (limit.maxValue === 0) {
        return 100;
      } else {
        return limit.maxValue === 0 || numCards / limit.maxValue > 1 ? 100 : (numCards / limit.maxValue) * 100;
      }
    } else {
      // Safety Value
      return 0;
    }
  }

  private setIsLimit() {
    this.isLimit = isNullOrUndefined(this.list.limits) ? false : this.list.limits.length > 0;
  }
}
