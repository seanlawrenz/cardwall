import { Component, OnInit, Input } from '@angular/core';
import { Card, Board } from '@app/models';
import { ConfigService } from '@app/app-services';
import { SortablejsOptions } from 'angular-sortablejs';

@Component({
  selector: 'td-cardwall-cards-view',
  templateUrl: './cardwall-cards-view.component.html',
  styleUrls: ['./cardwall-cards-view.component.scss'],
})
export class CardwallCardsViewComponent implements OnInit {
  @Input() cards: Card[];
  @Input() board: Board;

  canEditCards: boolean;
  canDeleteCards: boolean;
  canUpdateCards: boolean;

  sortableOptions: SortablejsOptions = {
    group: 'cards',
    ghostClass: 'dragging-overlay',
    scroll: true,
    filter: '.card-drag-disabled',
  };

  constructor(private config: ConfigService) {}

  ngOnInit() {
    this.setPermissions();
  }

  private setPermissions() {
    this.canEditCards = this.config.config.CanEditTasks;
    this.canDeleteCards = this.config.config.CanDeleteTasks;
    this.canUpdateCards = this.config.config.CanUpdateTasks;

    this.sortableOptions.disabled = !this.canUpdateCards;
  }
}
