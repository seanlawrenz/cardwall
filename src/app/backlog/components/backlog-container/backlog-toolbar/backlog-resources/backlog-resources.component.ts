import { Component, OnInit, Input } from '@angular/core';
import { Resources } from '@app/models';

@Component({
  selector: 'td-backlog-resources',
  templateUrl: './backlog-resources.component.html',
  styleUrls: ['./backlog-resources.component.scss'],
})
export class BacklogResourcesComponent implements OnInit {
  @Input() resources: Resources[];
  constructor() {}

  ngOnInit() {}
}
