import { Component, OnInit, Input } from '@angular/core';
import { Board } from '@app/models';

@Component({
  selector: 'td-cardwall-nav',
  templateUrl: './cardwall-nav.component.html',
  styleUrls: ['./cardwall-nav.component.scss'],
})
export class CardwallNavComponent implements OnInit {
  @Input() board: Board;

  constructor() {}

  ngOnInit() {}
}
