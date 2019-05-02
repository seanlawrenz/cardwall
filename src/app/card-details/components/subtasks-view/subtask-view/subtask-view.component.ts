import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
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
  @Output() promoteSubtaskRequested = new EventEmitter<Subtask>();
  @Output() deleteSubtaskRequested = new EventEmitter<Subtask>();

  @ViewChild('promotePop') promotePop;
  @ViewChild('deletePop') deletePop;

  editSubtask = false;
  subtaskForm: FormGroup;
  promoteConfirmMessage: string;
  deleteConfirmMessage: string;

  ngOnInit() {
    this.setUpForm();
    if (this.canAddCards) {
      this.promoteConfirmMessage = `Are you sure you want to convert subtask '${
        this.subtask.title
      }'? This will delete the subtask and cannot be undone.`;
    }

    if (this.canDeleteCards) {
      this.deleteConfirmMessage = `Are you sure you want to delete subtask '${this.subtask.title}'? This cannot be undone.`;
    }
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

  promoteSubtask() {
    const subtask = { ...this.subtask };
    this.promoteSubtaskRequested.emit(subtask);
  }

  deleteSubtask() {
    this.deleteSubtaskRequested.emit({ ...this.subtask });
  }

  closePopover() {
    this.promotePop.hide();
    this.deletePop.hide();
  }

  private setUpForm() {
    this.subtaskForm = new FormGroup({
      title: new FormControl(this.subtask.title, Validators.required),
    });
  }
}
