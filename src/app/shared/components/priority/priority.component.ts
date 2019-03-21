import { Component, OnInit, Input, KeyValueDiffers } from '@angular/core';
import { PriorityClasses, Priority } from '@app/models';

import { find } from 'lodash';

@Component({
  selector: 'td-priority',
  templateUrl: './priority.component.html',
  styleUrls: ['./priority.component.scss'],
})
export class PriorityComponent implements OnInit {
  @Input() priorityId: number;
  priorityClasses = new PriorityClasses().priorityClasses;
  priority: Priority;

  constructor() {}

  ngOnInit() {
    if (this.priorityId !== 0) {
      this.priority = find(this.priorityClasses, p => p.id === this.priorityId);
    }
  }
}
