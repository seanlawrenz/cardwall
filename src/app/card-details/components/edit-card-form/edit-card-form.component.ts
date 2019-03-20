import { Component, OnInit, Input } from '@angular/core';
import { ConfigService } from '@app/app-services';
import { Card } from '@app/models';

@Component({
  selector: 'td-edit-card-form',
  templateUrl: './edit-card-form.component.html',
  styleUrls: ['./edit-card-form.component.scss'],
})
export class EditCardFormComponent implements OnInit {
  @Input() card: Card;
  // Permissions
  isAssigned: boolean;
  canUpdate: boolean;
  canEdit: boolean;
  canEditOrUpdate: boolean;

  constructor(private config: ConfigService) {}

  ngOnInit() {
    this.setPermissions();
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
}
