import { Component, OnInit, Input } from '@angular/core';
import { Card } from '@app/models';

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
  @Input() issuesEnabled = true;
  @Input() showAttachments = true;
  @Input() showDescription = true;
  backgroundColor: string;
  constructor() {}

  ngOnInit() {
    let color;
    switch (this.card.cssClass) {
      case CardColors.DEFAULT:
        color = 'default';
        break;

      case CardColors.PRIMARY:
        color = 'primary';
        break;

      case CardColors.SUCCESS:
        color = 'success';
        break;

      case CardColors.INFO:
        color = 'info';
        break;

      case CardColors.WARNING:
        color = 'warning';
        break;

      case CardColors.DANGER:
        color = 'danger';
        break;

      default:
        color = 'default';
    }
    this.backgroundColor = `tdNg-card-color-${color}`;
  }

  openCardDetails() {
    console.log(`${this.card.name} clicked`);
  }

  archiveCard() {
    console.log(`${this.card.name} needs to be archived`);
  }
}
