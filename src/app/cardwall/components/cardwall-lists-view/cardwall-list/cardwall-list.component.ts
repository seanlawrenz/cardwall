import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { List, Board, ListLimit } from '@app/models';

import { ConfigService } from '@app/app-services';

import { truncate } from 'lodash';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'td-cardwall-list',
  templateUrl: './cardwall-list.component.html',
  styleUrls: ['./cardwall-list.component.scss'],
})
export class CardwallListComponent implements OnInit, OnChanges {
  @Input() list: List;
  @Input() board: Board;

  @Output() editListRequested = new EventEmitter<List>();

  canEditPlans: boolean;
  canAddCards: boolean;
  canDeleteCards: boolean;
  canEditCards: boolean;
  canUpdateCards: boolean;

  editListForm: FormGroup;

  constructor(private config: ConfigService) {}

  ngOnInit() {
    this.setPermissions();
    this.setupForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.board && !changes.board.firstChange) {
      this.setPermissions();
    }

    // if (changes.list && !changes.list.firstChange) {
    //   this.setupForm();
    // }
  }

  getListHeaderText(listName: string): string {
    return truncate(listName, { length: 60, separator: ' ' });
  }

  editList() {
    if (this.editListForm.valid) {
      const { title, description, percentComplete, statusTypeId, wipMin, wipMax, active } = this.editListForm.value;
      const wip: ListLimit =
        this.list.limits.length === 0 && isNullOrUndefined(wipMax) && isNullOrUndefined(wipMin)
          ? undefined
          : {
              minValue: wipMin,
              maxValue: wipMax,
              statusID: statusTypeId,
              projectID: this.list.projectId,
              planID: this.list.planId,
            };
      const list: List = { ...this.list, title, description, percentComplete, statusTypeId, active };
      if (!isNullOrUndefined(wip)) {
        list.limits = [wip];
      }
      this.editListRequested.emit(list);
    }
  }

  private setPermissions() {
    this.canEditPlans = this.config.config.CanEditPlans;
    this.canAddCards = this.config.config.CanAddTasks;
    this.canDeleteCards = this.config.config.CanDeleteTasks;
    this.canEditCards = this.config.config.CanEditTasks;
    this.canUpdateCards = this.config.config.CanUpdateTasks;
  }

  private setupForm() {
    const min: number = this.list.limits.length > 0 ? this.list.limits[0].minValue : undefined;
    const max: number = this.list.limits.length > 0 ? this.list.limits[0].maxValue : undefined;
    this.editListForm = new FormGroup(
      {
        title: new FormControl(this.list.title, Validators.required),
        description: new FormControl(this.list.description),
        percentComplete: new FormControl(this.list.percentComplete),
        statusTypeId: new FormControl(this.list.statusTypeId, Validators.required),
        wipMin: new FormControl(min),
        wipMax: new FormControl(max),
        active: new FormControl(this.list.active),
      },
      { validators: this.wipValidator },
    );
  }

  wipValidator(group: FormGroup) {
    const min = group.controls['wipMin'].value;
    const max = group.controls['wipMax'].value;

    if (!isNullOrUndefined(min) && !isNullOrUndefined(max)) {
      if (min > max) {
        return { invalidMinMax: true };
      }
    }

    if (!isNullOrUndefined(min)) {
      if (min < 0) {
        return { negativeMinMax: true };
      }

      if (min % 1 !== 0) {
        return { invalidMinMaxNumber: true };
      }
    }

    if (!isNullOrUndefined(max)) {
      if (max < 0) {
        return { negativeMinMax: true };
      }

      if (min % 1 !== 0) {
        return { invalidMinMaxNumber: true };
      }
    }
  }
}
