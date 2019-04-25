import { Component, OnInit, Input } from '@angular/core';
import { Subtask } from '@app/models';

@Component({
  selector: 'td-subtasks-view',
  templateUrl: './subtasks-view.component.html',
  styleUrls: ['./subtasks-view.component.scss'],
})
export class SubtasksViewComponent implements OnInit {
  @Input() subtasks: Subtask[];
  @Input() errors: string;

  constructor() {}

  ngOnInit() {}
}
