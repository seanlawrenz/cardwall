import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { PlanIdentifier } from '@app/models';
import { NotificationService } from '@app/app-services/notification.service';

@Component({
  selector: 'app-backlog-base',
  templateUrl: './backlog-base.component.html',
  styleUrls: ['./backlog-base.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BacklogBaseComponent implements OnInit {
  projects = '';

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {}
}
