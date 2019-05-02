import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Subtask } from '@app/models';

@Component({
  selector: 'td-subtask-view',
  templateUrl: './subtask-view.component.html',
  styleUrls: ['./subtask-view.component.scss'],
})
export class SubtaskViewComponent implements OnInit {
  @Input() subtask: Subtask;
  @Input() canUpdateCards: boolean;
  @Input() canEditCards: boolean;
  @Input() canAddCards: boolean;
  @Input() canDeleteCards: boolean;

  @Output() toggleSubtaskCompleted = new EventEmitter<Subtask>();
  @Output() updateSubtaskRequested = new EventEmitter<Subtask>();

  editSubtask = false;
  subtaskForm: FormGroup;
  constructor() {}

  ngOnInit() {
    this.setUpForm();
  }

  toggleCompleted() {
    this.toggleSubtaskCompleted.emit({ ...this.subtask });
  }

  toggleEditSubtask() {
    this.editSubtask = this.editSubtask ? false : true;
  }

  updateSubtask() {
    const subtask = { ...this.subtask, title: this.subtaskForm.controls['title'].value };
    this.updateSubtaskRequested.emit(subtask);
  }

  private setUpForm() {
    this.subtaskForm = new FormGroup({
      title: new FormControl(this.subtask.title, Validators.required),
    });
  }
}
