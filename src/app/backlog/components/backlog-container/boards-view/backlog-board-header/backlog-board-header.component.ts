import { Component, OnInit, Input } from '@angular/core';
import { Plan } from '@app/models';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'td-backlog-board-header',
  templateUrl: './backlog-board-header.component.html',
  styleUrls: ['./backlog-board-header.component.scss'],
})
export class BacklogBoardHeaderComponent implements OnInit {
  @Input() plan: Plan;

  constructor() {}

  ngOnInit() {}
}
