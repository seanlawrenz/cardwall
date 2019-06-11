import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
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
  @Input() isOwnerSelected: boolean;

  @Output() selectCardRequested = new EventEmitter<ElementRef>();
  @Output() cardDetailsRequested = new EventEmitter<CardDetailsPageTypes>();
  @Output() archiveCardRequested = new EventEmitter<void>();
  @Output() addResourceRequested = new EventEmitter<{ resource: Resources; clearAssignments: boolean }>();

  @ViewChild('cardElement') cardElement: ElementRef;

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
    this.selectCardRequested.emit(this.cardElement);
  }

  onResourceDrop(event: { resource: Resources; clearAssignments: boolean }) {
    this.addResourceRequested.emit(event);
  }
}
