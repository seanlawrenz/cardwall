import { Component, OnInit, Input } from '@angular/core';
import { Board, List } from '@app/models';

@Component({
  selector: 'td-cardwall-lists-view',
  templateUrl: './cardwall-lists-view.component.html',
  styleUrls: ['./cardwall-lists-view.component.scss'],
})
export class CardwallListsViewComponent implements OnInit {
  @Input() board: Board;
  @Input() lists: List[];

  constructor() {}

  ngOnInit() {}
}
