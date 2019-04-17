import { Injectable } from '@angular/core';
import { List } from '@app/models';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root',
})
export class ListService {
  constructor(private config: ConfigService) {}

  ticketToTaskUrl(list: List): string {
    return `${this.config.config.TDNextBasePath}Apps/Projects/Plans/AddTaskFromTicket?ProjectID=${list.projectId}&PlanID=${
      list.planId
    }&StatusID=${list.id}`;
  }
}
