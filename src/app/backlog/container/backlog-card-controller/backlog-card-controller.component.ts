import { Component, OnInit, Input } from '@angular/core';
import { SortablejsOptions } from 'angular-sortablejs';

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
        event.clone.cardData = this.cards[oldIndex];
        break;

      case CardMovementTypes.ADD:
        const {
          clone: { cardData },
        } = event;
        const { listId, projectId, planId } = this.listInfo;
        cardData.listId = listId;

        if (cardData.projectId !== projectId || cardData.planId !== planId) {
          cardData.projectId = projectId;
          cardData.planId = planId;
        }
        break;

      case CardMovementTypes.END:
        if (newIndex === oldIndex && event.clone.cardData.listId === this.listInfo.listId) {
          return;
        }
        this.dragCardEnd(event.clone.cardData, newIndex, oldIndex);
    }
  }

  private dragCardEnd(card: Card, newIndex: number, oldIndex: number) {
    // Move within this list
    if (card.listId === this.listInfo.listId) {
      this.cardService.moveCardWithInSameList(this.cards, newIndex);
    }
  }
}
