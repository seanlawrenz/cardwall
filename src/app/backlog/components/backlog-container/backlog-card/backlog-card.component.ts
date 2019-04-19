import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ConfigService } from '@app/app-services';
import { Card, CardDetailsPageTypes, Resources } from '@app/models';
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
  @Output() archiveCardRequested = new EventEmitter<void>();
  @Output() addResourceRequested = new EventEmitter<Resources>();

  canUpdate: boolean;
  backgroundColor: string;
  constructor(private config: ConfigService) {}

  ngOnInit() {
    this.backgroundColor = getCardColor(this.card);
    this.canUpdate = this.config.config.CanUpdateTasks;
  }

  openCardDetails(type: CardDetailsPageTypes) {
    this.cardDetailsRequested.emit(type);
  }

  archiveCard() {
    this.archiveCardRequested.emit();
  }

  selectCard() {
    this.selectCardRequested.emit();
  }

  onResourceDrop(resource: Resources) {
    this.addResourceRequested.emit(resource);
  }
}
