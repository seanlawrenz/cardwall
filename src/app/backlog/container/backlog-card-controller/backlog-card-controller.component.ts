import { Component, OnInit, Input } from '@angular/core';
import { SortablejsOptions } from 'angular-sortablejs';

import { Store } from '@ngrx/store';
import * as fromBacklog from '@app/backlog/state';
import * as backlogActions from '@app/backlog/state/backlog.actions';

import { CardService } from '@app/app-services/card.service';
import { Card } from '@app/models';

/**
 * Not sure the issue here, but not able to import this enum
 * so it is declared here
 */
export enum CardMovementTypes {
  START = 'START',
  ADD = 'ADD',
  UPDATE = 'UPDATE',
  END = 'END',
}

@Component({
  selector: 'td-backlog-card-controller',
  templateUrl: './backlog-card-controller.component.html',
  styleUrls: ['./backlog-card-controller.component.scss'],
})
export class BacklogCardControllerComponent implements OnInit {
  @Input() cards: Card[];
  @Input() listInfo: { listId: number; projectId: number; planId: number };

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
    onStart: event => this.cardMovement(event, CardMovementTypes.START),
    onAdd: event => this.cardMovement(event, CardMovementTypes.ADD),
    onEnd: event => this.cardMovement(event, CardMovementTypes.END),
  };

  constructor(private cardService: CardService) {}

  ngOnInit() {}

  cardMovement(event, type: string) {
    const { newIndex, oldIndex } = event;
    switch (type) {
      case CardMovementTypes.START:
        this.cardService.dragCard = this.cards[oldIndex];
        break;

      case CardMovementTypes.ADD:
        const { listId, projectId, planId } = this.listInfo;
        this.cardService.dragCard.listId = listId;

        if (this.cardService.dragCard.projectId !== projectId || this.cardService.dragCard.planId !== planId) {
          this.cardService.dragCard.projectId = projectId;
          this.cardService.dragCard.planId = planId;
        }
        break;

      case CardMovementTypes.END:
        if (newIndex === oldIndex && this.cardService.dragCard.listId === this.listInfo.listId) {
          return;
        }
        this.dragCardEnd(newIndex, oldIndex);
    }
  }

  private dragCardEnd(newIndex, oldIndex) {
    console.log('hello');
  }
}
