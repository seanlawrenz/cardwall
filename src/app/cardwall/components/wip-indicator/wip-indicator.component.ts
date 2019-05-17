import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { List, ListLimit } from '@app/models';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'td-wip-indicator',
  templateUrl: './wip-indicator.component.html',
  styleUrls: ['./wip-indicator.component.scss'],
})
export class WipIndicatorComponent implements OnInit, OnChanges {
  @Input() list: List;

  isLimit: boolean;

  constructor() {}

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

  buildWipToolTip(limit: ListLimit): string {
    let message = '';
    const numCards: number = this.list.cards.length;
    const cardString = this.list.cards.length === 1 ? 'card' : 'cards';

    if (this.isLimit) {
      const isMax = !isNullOrUndefined(limit.maxValue);
      const isMin = !isNullOrUndefined(limit.minValue);
      if (this.isWIPLimitViolated()) {
        // tslint:disable-next-line:max-line-length
        message = `The Work In Progress (WIP) limit for this list has been violated. The list contains ${numCards} ${cardString}, but has been configured with a`;
      } else {
        message = `This list contains ${numCards} ${cardString}, and and has been configured with a`;
      }

      if (isMin) {
        message = `${message} minimum WIP limit of ${limit.minValue}`;
      }

      if (isMin && isMax) {
        message = `${message} and a`;
      }

      if (isMax) {
        message = `${message} maximum WIP limit of ${limit.maxValue}`;
      }

      message = `${message}.`;
    } else {
      message = 'A Work In Progress (WIP) Limit has not been configured for this list.';
    }

    return message;
  }

  private setIsLimit() {
    this.isLimit = isNullOrUndefined(this.list.limits) ? false : this.list.limits.length > 0;
  }
}
