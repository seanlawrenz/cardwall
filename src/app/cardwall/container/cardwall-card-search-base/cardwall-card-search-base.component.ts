import { Component, OnInit, Input } from '@angular/core';
import { Board } from '@app/models';

@Component({
  selector: 'td-cardwall-card-search-base',
  templateUrl: './cardwall-card-search-base.component.html',
  styleUrls: ['./cardwall-card-search-base.component.scss'],
})
export class CardwallCardSearchBaseComponent implements OnInit {
  @Input() board: Board;

  constructor() {}

  ngOnInit() {}
}
