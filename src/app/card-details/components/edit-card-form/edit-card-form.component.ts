import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn } from '@angular/forms';
import { ConfigService } from '@app/app-services';
import { Card, Plan, Board } from '@app/models';
import { blankInputValidator } from '@app/utils';

@Component({
  selector: 'td-edit-card-form',
  templateUrl: './edit-card-form.component.html',
  styleUrls: ['./edit-card-form.component.scss'],
})
export class EditCardFormComponent implements OnInit {
  @Input() _card: Card;
  @Input() plan: Plan | Board;

  card: Card;

  // Permissions
  isAssigned: boolean;
  canUpdate: boolean;
  canEdit: boolean;
  canEditOrUpdate: boolean;

  // Form
  cardForm: FormGroup;
  areDatesInvalid: boolean;

  constructor(private config: ConfigService) {}

  ngOnInit() {
    this.card = { ...this._card };
    this.setPermissions();
    this.createForm();
  }

  onIsStoryChanged(e) {
    this.card.isStory = e;
  }

  discardChanges() {
    this.discardChangesRequested.emit();
  }

  private setPermissions() {
    // Determine whether or not the resource is assigned to the task
    this.isAssigned =
      this.card.owners && this.card.owners.findIndex(o => o.uid.toLowerCase() === this.config.config.UID.toLowerCase()) >= 0;
    // If the user is assigned to the card and has can update my tasks only, they can update, otherwise check the standard permission
    if (this.config.config.CanUpdateTasks) {
      this.canEditOrUpdate = true;
    } else if (this.config.config.CanUpdateMyTasksOnly) {
      this.canEditOrUpdate = this.isAssigned;
    } else {
      this.canEditOrUpdate = this.config.config.CanEditTasks;
    }

    this.canEdit = this.config.config.CanEditTasks;
  }

  private createForm() {
    this.cardForm = new FormGroup({
      name: new FormControl(this.card.name, [Validators.required, blankInputValidator]),
      description: new FormControl(this.card.description),
      startDate: new FormControl(this.card.startDate),
      endDate: new FormControl(this.card.endDate),
      estimatedHrs: new FormControl(this.card.estimatedHours, [Validators.required, Validators.min(0), Validators.max(2147483647)]),
      remainingHrs: new FormControl(this.card.remainingHours, Validators.required),
      percentComplete: new FormControl(this.card.percentComplete, [Validators.required, Validators.min(0), Validators.max(100)]),
      priorityId: new FormControl(this.card.priorityId),
      isStory: new FormControl(this.card.isStory),
      storyPoints: new FormControl(this.card.storyPoints, [Validators.required, Validators.min(0), Validators.max(2147483647)]),
      valuePoints: new FormControl(this.card.valuePoints, [Validators.required, Validators.min(0), Validators.max(2147483647)]),
      owners: new FormControl(this.card.owners),
      tags: new FormControl(this.card.tags),
      cssClass: new FormControl(this.card.cssClass),
    });
    this.isStartDateAfterEndDate();
  }

  private isStartDateAfterEndDate(): ValidatorFn {
    return (group: FormGroup): { [key: string]: any } => {
      if (!this.card.startDate || !this.card.endDate) {
        this.areDatesInvalid = false;
        return {};
      }

      let start: Date;
      if (typeof this.card.startDate === 'string') {
        start = new Date(<string>this.card.startDate);
      } else {
        start = this.card.startDate;
      }

      let end: Date;
      if (typeof this.card.endDate === 'string') {
        end = new Date(<string>this.card.endDate);
      } else {
        end = this.card.endDate;
      }

      this.areDatesInvalid = start > end;

      if (this.areDatesInvalid) {
        return {
          startDate: 'Start date cannot be after end date',
        };
      } else {
        return {};
      }
    };
  }
}
