import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
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

  percentComplete = 75;

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
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.owners && !changes.owners.firstChange) {
      this.setPermissions();
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
