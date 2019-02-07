import { Component, OnInit, Input } from '@angular/core';
import { Card } from '@app/models';

@Component({
  selector: 'td-backlog-card',
  templateUrl: './backlog-card.component.html',
  styleUrls: ['./backlog-card.component.scss'],
})
export class BacklogCardComponent implements OnInit {
  @Input() card: Card;
  constructor() {}

  ngOnInit() {}
}
