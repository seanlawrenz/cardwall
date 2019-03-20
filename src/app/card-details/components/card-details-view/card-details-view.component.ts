import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Card } from '@app/models';
import { getCardColor } from '@app/utils';

@Component({
  selector: 'td-card-details-view',
  templateUrl: './card-details-view.component.html',
  styleUrls: ['./card-details-view.component.scss'],
})
export class CardDetailsViewComponent implements OnInit {
  @Input() card: Card;

  @Output() closeDialogRequested = new EventEmitter<void>();

  cardBackgroundColor: string;
  constructor() {}

  ngOnInit() {
    this.cardBackgroundColor = getCardColor(this.card);
  }

  closeDialog() {
    this.closeDialogRequested.emit();
  }
}
