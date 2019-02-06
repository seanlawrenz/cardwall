import { Component, OnInit, Input } from '@angular/core';
import { List } from '@app/models';

@Component({
  selector: 'td-backlog-list',
  templateUrl: './backlog-list.component.html',
  styleUrls: ['./backlog-list.component.scss'],
})
export class BacklogListComponent implements OnInit {
  @Input() list: List;

  constructor() {}

  ngOnInit() {}
}
