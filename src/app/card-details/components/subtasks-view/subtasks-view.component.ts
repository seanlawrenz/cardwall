import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ConfigService } from '@app/app-services';
import { Subtask, Resources } from '@app/models';

import { isNullOrUndefined } from 'util';
import { SortablejsOptions } from 'angular-sortablejs';

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

  percentComplete = 0;

  canAddCards: boolean;
  canEditCards: boolean;
  canUpdateCards: boolean;

  newSubtaskForm: FormGroup;

  sortableOptions: SortablejsOptions = {
    group: 'subtasks',
    handle: '.tdNg-grip',
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

    this.sortableOptions.disabled = !this.canEditCards;
  }

  private setUpForm() {
    this.newSubtaskForm = new FormGroup({
      title: new FormControl('', Validators.required),
    });
  }
}
