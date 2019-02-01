import { Component, OnInit, Input } from '@angular/core';
import { Plan } from '@app/models';

@Component({
  selector: 'td-backlog-container',
  templateUrl: './backlog-container.component.html',
  styleUrls: ['./backlog-container.component.scss'],
})
export class BacklogContainerComponent implements OnInit {
  @Input() plans: Plan[];

  constructor() {}

  ngOnInit() {}
}
