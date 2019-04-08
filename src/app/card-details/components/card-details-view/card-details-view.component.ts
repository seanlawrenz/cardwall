import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Card, CardDetailsPageTypes } from '@app/models';
import { getCardColor } from '@app/utils';

@Component({
  selector: 'td-card-details-view',
  templateUrl: './card-details-view.component.html',
  styleUrls: ['./card-details-view.component.scss'],
})
export class CardDetailsViewComponent implements OnInit {
  @Input() card: Card;
  @Input() selectedPage: CardDetailsPageTypes;

  @Output() closeDialogRequested = new EventEmitter<void>();
  @Output() changeDetailsPage = new EventEmitter<CardDetailsPageTypes>();

  @ViewChild('content') mainContent: ElementRef;

  cardBackgroundColor: string;
  constructor() {}

  ngOnInit() {
    this.cardBackgroundColor = getCardColor(this.card);
  }

  closeDialog() {
    this.closeDialogRequested.emit();
  }

  detailPageRequested(type: CardDetailsPageTypes) {
    this.changeDetailsPage.emit(type);
  }

  skipLink() {
    this.mainContent.nativeElement.focus();
  }
}
