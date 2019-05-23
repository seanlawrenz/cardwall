import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Card, Board, Resources } from '@app/models';
import { ConfigService } from '@app/app-services';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'td-card-view',
  templateUrl: './card-view.component.html',
  styleUrls: ['./card-view.component.scss'],
})
export class CardViewComponent implements OnInit {
  @Input() card: Card;
  @Input() board: Board;

  isInMyWork = false;
  canUpdate: boolean;
  canDeleteCards: boolean;

  isSelected = false;
  isHighlighted = false;

  constructor(private config: ConfigService, private router: Router) {}

  ngOnInit() {
    this.setPermissions();
  }

  getCardStyle(): string {
    if (this.isSelected) {
      return 'tdNg-card-selected';
    }

    return `tdNg-card-color-${this.card.cssClass}`;
  }

  routeToEditCard() {
    const url = `cardwall/project/${this.card.projectId}/board/${this.card.planId}/card/${this.card.id}`;
    this.router.navigate([url]);
  }

  private setPermissions() {
    this.isInMyWork = this.board.myWorkTaskIDs.find(i => i === this.card.id) && this.card.listId !== 0;
    this.canDeleteCards = this.config.config.CanDeleteTasks;
    if (this.config.config.CanUpdateTasks) {
      this.canUpdate = true;
    } else {
      this.canUpdate =
        this.config.config.CanUpdateMyTasksOnly &&
        !isNullOrUndefined(this.card.owners.find((o: Resources) => o.uid === this.config.config.UID));
    }
  }
}
