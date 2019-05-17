import { Component, OnInit, Input } from '@angular/core';
import { List, Board } from '@app/models';

import { ConfigService } from '@app/app-services';

import { truncate } from 'lodash';

@Component({
  selector: 'td-cardwall-list',
  templateUrl: './cardwall-list.component.html',
  styleUrls: ['./cardwall-list.component.scss'],
})
export class CardwallListComponent implements OnInit {
  @Input() list: List;
  @Input() board: Board;

  canEditPlans: boolean;
  canAddCards: boolean;
  canDeleteCards: boolean;
  canEditCards: boolean;
  canUpdateCards: boolean;

  constructor(private config: ConfigService) {}

  ngOnInit() {
    this.setPermissions();
  }

  getListHeaderText(listName: string): string {
    return truncate(listName, { length: 60, separator: ' ' });
  }

  private setPermissions() {
    this.canEditPlans = this.config.config.CanEditPlans;
    this.canAddCards = this.config.config.CanAddTasks;
    this.canDeleteCards = this.config.config.CanDeleteTasks;
    this.canEditCards = this.config.config.CanEditTasks;
    this.canUpdateCards = this.config.config.CanUpdateTasks;
  }
}
