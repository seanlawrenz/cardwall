import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, ElementRef } from '@angular/core';
import { Card, Board, List, Resources } from '@app/models';
import { ConfigService } from '@app/app-services';
import { SortablejsOptions } from 'angular-sortablejs';
import { CardMovementTypes } from '@app/backlog/container/backlog-cards-controller/backlog-cards-controller.component';

import { filter } from 'lodash';

@Component({
  selector: 'td-cardwall-cards-view',
  templateUrl: './cardwall-cards-view.component.html',
  styleUrls: ['./cardwall-cards-view.component.scss'],
})
export class CardwallCardsViewComponent implements OnInit, OnChanges {
  @Input() cards: Card[];
  @Input() list: List;
  @Input() board: Board;
  @Input() selectedCard: Card;
  @Input() selectedResource: Resources;

  @Output() cardMoveRequested = new EventEmitter<{ card: Card; cards: Card[]; newIndex: number }>();
  @Output() archiveOrDeleteCardRequested = new EventEmitter<Card>();
  @Output() cardSelectedRequested = new EventEmitter<{ card: Card; element: ElementRef }>();
  @Output() addResourceRequested = new EventEmitter<{ card: Card; resource: Resources; clearAssignments: boolean }>();

  canEditCards: boolean;
  canDeleteCards: boolean;
  canUpdateCards: boolean;

  cardsWithSelectedResource: number[] = [];

  sortableOptions: SortablejsOptions = {
    group: 'cards',
    ghostClass: 'dragging-overlay',
    scroll: true,
    filter: '.card-drag-disabled',
    onAdd: event => this.cardMovement(event, CardMovementTypes.ADD),
    onStart: event => this.cardMovement(event, CardMovementTypes.START),
    onEnd: event => this.cardMovement(event, CardMovementTypes.END),
  };

  constructor(private config: ConfigService) {}

  ngOnInit() {
    this.setPermissions();
    this.updateSelectedResource(this.selectedResource);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.selectedResource && !changes.selectedResource.firstChange) {
      this.updateSelectedResource(changes.selectedResource.currentValue);
    }
  }

  cardMovement(event, type: string) {
    const { newIndex, oldIndex } = event;
    switch (type) {
      case CardMovementTypes.START:
        event.clone.cardData = this.cards[oldIndex];
        break;

      case CardMovementTypes.ADD:
        event.clone.cardData.listId = this.list.id;
        break;

      case CardMovementTypes.END:
        const {
          clone: { cardData },
        } = event;
        if (newIndex === oldIndex && cardData.listId === this.list.id) {
          return;
        }
        this.cardMoveRequested.emit({ card: cardData, cards: this.cards, newIndex });
    }
  }

  archiveOrDeleteCard(card: Card) {
    this.archiveOrDeleteCardRequested.emit(card);
  }

  cardSelected(e: { card: Card; element: ElementRef }) {
    const { card, element } = e;
    this.cardSelectedRequested.emit({ card, element });
  }

  isCardSelected(card: Card): boolean {
    return this.selectedCard.id === card.id;
  }

  onResourceDrop(event: { card: Card; resource: Resources; clearAssignments: boolean }) {
    this.addResourceRequested.emit(event);
  }

  private setPermissions() {
    this.canEditCards = this.config.config.CanEditTasks;
    this.canDeleteCards = this.config.config.CanDeleteTasks;
    this.canUpdateCards = this.config.config.CanUpdateTasks;

    this.sortableOptions.disabled = !this.canUpdateCards;
  }

  private updateSelectedResource(resource: Resources) {
    this.cardsWithSelectedResource = [];
    if (resource) {
      this.cards.map(card => {
        if (card.owners && card.owners.length > 0) {
          if (filter(card.owners, o => o.uid === resource.uid).length > 0) {
            this.cardsWithSelectedResource.push(card.id);
          }
        }
      });
    }
  }
}
