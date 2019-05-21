import { Component, OnInit, Input } from '@angular/core';
import { Card } from '@app/models';

@Component({
  selector: 'td-cardwall-cards-view',
  templateUrl: './cardwall-cards-view.component.html',
  styleUrls: ['./cardwall-cards-view.component.scss'],
})
export class CardwallCardsViewComponent implements OnInit {
  @Input() cards: Card[];

  constructor() {}

  ngOnInit() {}
}
