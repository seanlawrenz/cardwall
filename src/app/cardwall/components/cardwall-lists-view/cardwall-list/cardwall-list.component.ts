import { Component, OnInit, Input } from '@angular/core';
import { List } from '@app/models';

@Component({
  selector: 'td-cardwall-list',
  templateUrl: './cardwall-list.component.html',
  styleUrls: ['./cardwall-list.component.scss'],
})
export class CardwallListComponent implements OnInit {
  @Input() list: List;

  constructor() {}

  ngOnInit() {}
}
