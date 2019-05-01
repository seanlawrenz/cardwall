import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Subtask } from '@app/models';

@Component({
  selector: 'td-subtask-view',
  templateUrl: './subtask-view.component.html',
  styleUrls: ['./subtask-view.component.scss'],
})
export class SubtaskViewComponent implements OnInit {
  @Input() subtask: Subtask;
  @Input() canUpdateCards: boolean;

  @Output() toggleSubtaskCompleted = new EventEmitter<Subtask>();

  constructor() {}

  ngOnInit() {}

  toggleCompleted() {
    this.toggleSubtaskCompleted.emit({ ...this.subtask });
  }
}
