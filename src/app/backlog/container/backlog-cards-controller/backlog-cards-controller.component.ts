import { Component, OnInit, Input } from '@angular/core';
import { SortablejsOptions } from 'angular-sortablejs';

import { CardService } from '@app/app-services/card.service';
import { Card, List } from '@app/models';

import { Store } from '@ngrx/store';
import * as fromBacklog from '@app/backlog/state';
import { SignalRService } from '@app/app-services';

import { getRelativeMoveCardId } from '@app/utils';

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
  selector: 'td-backlog-cards-controller',
  templateUrl: './backlog-cards-controller.component.html',
  styleUrls: ['./backlog-cards-controller.component.scss'],
})
export class BacklogCardsControllerComponent implements OnInit {
  @Input() cards: Card[];
  @Input() listInfo: { listId: number; projectId: number; planId: number };

  // Card Move
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

  constructor(private cardService: CardService, private signalRService: SignalRService, private store: Store<fromBacklog.BacklogState>) {}

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

  /**
   * The end of a drag is called on the component that the drag originated from.
   * This card could be heading to a new list in a new plan or project.
   */
  private dragCardEnd(card: Card, newIndex: number, oldIndex: number) {
    // Move within this list
    if (card.listId === this.listInfo.listId) {
      this.cardService.moveCardWithInSameList(this.cards, newIndex);
    }

    // Move to new lists within this board
    if (card.listId !== this.listInfo.listId && card.planId === this.listInfo.planId) {
      // Get the list to where this card is heading
      this.store.select(fromBacklog.getListById(card.planId, card.listId)).subscribe((list: List) => {
        this.cardService.moveCardToListInSameBoard(list.cards, card, this.listInfo.listId, newIndex).subscribe(() => {
          // placeholder for ending the saving service
        });
      });
    } else {
      // Move outside of project or plan
      const { projectId, planId, listId } = this.listInfo;
      // Signal R wants original card with old plan, project and list data
      const originatedCard = { ...card, projectId, planId, listId };
      this.store.select(fromBacklog.getListById(card.planId, card.listId)).subscribe((list: List) => {
        const relativeMoveCardId = getRelativeMoveCardId(list.cards, card, newIndex);
        this.signalRService
          .invoke('CardMoveRelativeTo', originatedCard, card.projectId, card.planId, card.listId, relativeMoveCardId)
          .subscribe(() => {
            // I don't like this, but if the client moves the card that card does not have the data on it to be removed via the
            // signal r call. So we must remove the card here.
            this.store.dispatch(new fromBacklog.DeleteCardOnBacklog(card));
          });
      });
    }
  }
}
