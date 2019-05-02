import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ConfigService } from '@app/app-services';
import { Subtask, Resources } from '@app/models';

import { isNullOrUndefined } from 'util';
import { SortablejsOptions } from 'angular-sortablejs';
import { trim } from 'lodash';

@Component({
  selector: 'td-subtasks-view',
  templateUrl: './subtasks-view.component.html',
  styleUrls: ['./subtasks-view.component.scss'],
})
export class SubtasksViewComponent implements OnInit, OnChanges {
  @Input() subtasks: Subtask[];
  @Input() errors: string;
  @Input() saving: boolean;
  @Input() owners: Resources[];

  @Output() updateSubtask = new EventEmitter<Subtask>();
  @Output() sortSubtasksRequested = new EventEmitter<{ newIndex: number; subtask: Subtask }>();
  @Output() promoteSubtaskRequested = new EventEmitter<Subtask>();
  @Output() deleteSubtaskRequested = new EventEmitter<Subtask>();
  @Output() createSubtaskRequested = new EventEmitter<Subtask>();

  percentComplete = 0;

  canAddCards: boolean;
  canEditCards: boolean;
  canUpdateCards: boolean;
  canDeleteCards: boolean;

  newSubtaskForm: FormGroup;

  sortableOptions: SortablejsOptions = {
    group: 'subtasks',
    handle: '.tdNg-grip',
    onStart: event => (event.clone.subtaskData = this.subtasks[event.oldIndex]),
    onEnd: event => this.sortSubtasks(event),
  };

  constructor(private config: ConfigService) {}

  ngOnInit() {
    this.setPermissions();
    this.setUpForm();
    this.setPercentComplete();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.owners && !changes.owners.firstChange) {
      this.setPermissions();
    }

    if (changes.subtasks && !changes.subtasks.firstChange) {
      this.setPercentComplete();
    }
  }

  toggleSubtask(subtask: Subtask) {
    subtask.percentCompleteWhole = subtask.percentCompleteWhole === 0 ? 100 : 0;
    this.updateSubtask.emit(subtask);
  }

  updateSubtaskRequested(subtask: Subtask) {
    // The subtask has been built immutable in the lower component so we can trim the title here.
    subtask.title = this.trimSubtaskTitle(subtask.title);
    this.updateSubtask.emit(subtask);
  }

  promoteSubtask(subtask: Subtask) {
    if (this.canAddCards) {
      this.promoteSubtaskRequested.emit(subtask);
    }
  }

  deleteSubtask(subtask: Subtask) {
    if (this.canDeleteCards) {
      this.deleteSubtaskRequested.emit(subtask);
    }
  }

  createSubtask() {
    if (this.canAddCards && this.newSubtaskForm.valid) {
      const newSubtask: Subtask = {
        title: this.trimSubtaskTitle(this.newSubtaskForm.controls['title'].value),
        ID: 0,
        percentCompleteWhole: 0,
        order: this.subtasks.length,
      };
      this.createSubtaskRequested.emit(newSubtask);
      this.newSubtaskForm.reset();
    }
  }

  private sortSubtasks(event) {
    const {
      newIndex,
      clone: { subtaskData },
    } = event;
    this.sortSubtasksRequested.emit({ newIndex, subtask: subtaskData });
  }

  private setPercentComplete() {
    let totalDone = 0;
    this.subtasks.map(subtask => {
      if (subtask.percentCompleteWhole === 100) {
        totalDone++;
      }
    });

    if (totalDone !== 0) {
      this.percentComplete = (totalDone / this.subtasks.length) * 100;
    } else {
      this.percentComplete = 0;
    }
  }

  private setPermissions() {
    if (this.config.config.CanUpdateTasks) {
      this.canUpdateCards = true;
    } else {
      this.canUpdateCards =
        this.config.config.CanUpdateMyTasksOnly &&
        this.owners &&
        !isNullOrUndefined(this.owners.find(o => o.uid === this.config.config.UID));
    }

    this.canAddCards = this.config.config.CanAddTasks;
    this.canEditCards = this.config.config.CanEditTasks;
    this.canDeleteCards = this.config.config.CanDeleteTasks;

    this.sortableOptions.disabled = !this.canEditCards;
  }

  private setUpForm() {
    this.newSubtaskForm = new FormGroup({
      title: new FormControl('', Validators.required),
    });
  }

  private trimSubtaskTitle(title: string): string {
    return trim(title);
  }
}
