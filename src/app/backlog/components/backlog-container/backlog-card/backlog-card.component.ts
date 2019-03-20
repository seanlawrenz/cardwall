import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Card, CardDetailsPageTypes } from '@app/models';
import { getCardColor } from '@app/utils';

enum CardColors {
  DEFAULT = 'default',
  PRIMARY = 'primary',
  SUCCESS = 'success',
  INFO = 'info',
  WARNING = 'warning',
  DANGER = 'danger',
}

@Component({
  selector: 'td-backlog-card',
  templateUrl: './backlog-card.component.html',
  styleUrls: ['./backlog-card.component.scss'],
})
export class BacklogCardComponent implements OnInit {
  @Input() card: Card;
  @Input() isOdd: boolean;
  @Input() showEstimateHours: boolean;
  @Input() showStoryPoints: boolean;
  @Input() isSelected: boolean;

  @Output() selectCardRequested = new EventEmitter<void>();
  @Output() cardDetailsRequested = new EventEmitter<CardDetailsPageTypes>();

  backgroundColor: string;
  constructor() {}

  ngOnInit() {
    this.backgroundColor = getCardColor(this.card);
  }

  openCardDetails(type: CardDetailsPageTypes) {
    this.cardDetailsRequested.emit(type);
  }

  archiveCard() {
    console.log(`${this.card.name} needs to be archived`);
  }

  selectCard() {
    this.selectCardRequested.emit();
  }
}
