import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Card } from '@app/models';

@Component({
  selector: 'td-subtasks-icon',
  templateUrl: './subtasks-icon.component.html',
  styleUrls: ['./subtasks-icon.component.scss'],
})
export class SubtasksIconComponent implements OnInit {
  @Input() card: Card;
  @Input() includeCount = false;

  @Output() subtasksClicked = new EventEmitter<void>();

  constructor() {}

  ngOnInit() {}

  onSubtasksClicked() {
    this.subtasksClicked.emit();
  }
}
