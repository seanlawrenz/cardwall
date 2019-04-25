import { Component, OnInit, Input } from '@angular/core';
import { Subtask } from '@app/models';

@Component({
  selector: 'td-subtask-view',
  templateUrl: './subtask-view.component.html',
  styleUrls: ['./subtask-view.component.scss'],
})
export class SubtaskViewComponent implements OnInit {
  @Input() subtask: Subtask;
  @Input() canUpdateCards: boolean;

  constructor() {}

  ngOnInit() {}
}
