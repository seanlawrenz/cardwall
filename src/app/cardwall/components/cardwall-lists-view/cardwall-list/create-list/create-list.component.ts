import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Board, List, ListLimit } from '@app/models';
import { minBy, maxBy } from 'lodash';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'td-create-list',
  templateUrl: './create-list.component.html',
  styleUrls: ['./create-list.component.scss'],
})
export class CreateListComponent implements OnInit {
  @Input() board: Board;

  @Output() createListRequested = new EventEmitter<List>();

  list: List;

  createListForm: FormGroup;

  ngOnInit() {
    this.createList();
    this.setupForm();
  }

  addList() {
    if (this.createListForm.valid) {
      const { title, description, percentComplete, statusTypeId, wipMin, wipMax, active } = this.createListForm.value;
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
      const list = { ...this.list, title, description, percentComplete, statusTypeId, active };
      if (!isNullOrUndefined(wip)) {
        list.limits = [wip];
      }
      this.createListRequested.emit(list);
    }
  }

  private createList() {
    let id = (minBy(this.board.lists, list => list.id).id || 0) - 1;
    if (id >= 0) {
      id = -1;
    }
    const order = (maxBy(this.board.lists, list => list.order).order || 0) + 1;
    this.list = {
      active: true,
      cards: [],
      description: null,
      id,
      limits: [],
      order,
      percentComplete: null,
      planId: this.board.id,
      projectId: this.board.projectId,
      title: '',
    };
  }

  private setupForm() {
    this.createListForm = new FormGroup(
      {
        title: new FormControl(this.list.title, Validators.required),
        description: new FormControl(this.list.description),
        percentComplete: new FormControl(this.list.percentComplete),
        statusTypeId: new FormControl(this.list.statusTypeId, Validators.required),
        wipMin: new FormControl(),
        wipMax: new FormControl(),
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
