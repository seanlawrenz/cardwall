import { Component, OnInit, Input } from '@angular/core';
import { Card } from '@app/models';
import { SortablejsOptions } from 'angular-sortablejs';

import { Store } from '@ngrx/store';
import * as fromBacklog from '@app/backlog/state';
import * as backlogActions from '@app/backlog/state/backlog.actions';

@Component({
  selector: 'td-backlog-card-controller',
  templateUrl: './backlog-card-controller.component.html',
  styleUrls: ['./backlog-card-controller.component.scss'],
})
export class BacklogCardControllerComponent implements OnInit {
  @Input() cards: Card[];

  sortableOptions: SortablejsOptions = {
    group: {
      name: 'backlog-cards',
      revertClone: false,
      put: ['backlog-cards'],
    },
    scroll: true,
    scrollSpeed: 10,
    scrollSensitivity: 150,
    ghostClass: 'tdNg-backlog-dragging-overlay-blue',
    onEnd: () => this.cardMovement(),
  };

  constructor() {}

  ngOnInit() {}

  cardMovement() {}
}
