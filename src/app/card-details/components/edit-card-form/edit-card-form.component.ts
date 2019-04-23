import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ConfigService } from '@app/app-services';
import { Card, Plan, Board, Priority, PriorityClasses, Resources } from '@app/models';

@Component({
  selector: 'td-edit-card-form',
  templateUrl: './edit-card-form.component.html',
  styleUrls: ['./edit-card-form.component.scss'],
})
export class EditCardFormComponent implements OnInit {
  @Input() card: Card;
  @Input() plan: Plan | Board;
  @Input() cardForm: FormGroup;

  @Output() discardChangesRequested = new EventEmitter<void>();
  @Output() copyMoveRequested = new EventEmitter<string>();
  @Output() saveCardRequested = new EventEmitter<void>();

  resources: Resources[];

  // Permissions
  isAssigned: boolean;
  canUpdate: boolean;
  canEdit: boolean;
  canEditOrUpdate: boolean;
  useRemainingHours: boolean;
  canAddCards: boolean;
  canDeleteCards: boolean;
  isInMyWork: boolean;
  isArchived: boolean;

  priorityClasses: Priority[];

  constructor(private config: ConfigService) {
    this.priorityClasses = new PriorityClasses().priorityClasses;
  }

  ngOnInit() {
    this.setPermissions();

    this.resources = this.plan.resources;

    // Disable the form if you don't have edit cards permissions
    if (!this.canEdit) {
      this.cardForm.disable();
    }
  }

  onIsStoryChanged(e) {
    this.card.isStory = e;
  }

  discardChanges() {
    this.discardChangesRequested.emit();
  }

  onSubmit() {
    this.saveCardRequested.emit();
  }

  copyMove(type: string) {
    this.copyMoveRequested.emit(type);
  }

  addToMyWork() {}

  removeFromMyWork() {}

  private setPermissions() {
    this.canEdit = this.config.config.CanEditTasks;
    this.canAddCards = this.config.config.CanAddTasks;
    this.canDeleteCards = this.config.config.CanDeleteTasks;

    // We only want to lock % complete if there are estimated hours AND we're set to use remaining hours on the project
    this.useRemainingHours = this.plan.useRemainingHours && this.card.estimatedHours > 0;

    this.isArchived = this.card.listId === 0;
    this.isInMyWork = !!this.plan.myWorkTaskIDs.find(i => i === this.card.id);

    // Determine whether or not the resource is assigned to the task
    this.isAssigned =
      this.card.owners && this.card.owners.findIndex(o => o.uid.toLowerCase() === this.config.config.UID.toLowerCase()) >= 0;

    // If the user is assigned to the card and has can update my tasks only, they can update, otherwise check the standard permission
    if (this.config.config.CanUpdateTasks) {
      this.canUpdate = true;
    } else {
      this.canUpdate = this.config.config.CanUpdateMyTasksOnly && this.isAssigned;
    }

    this.canEditOrUpdate = this.canUpdate || this.canEdit;
  }
}
