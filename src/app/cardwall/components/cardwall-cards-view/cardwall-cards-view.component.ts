import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Card, Board, List } from '@app/models';
import { ConfigService } from '@app/app-services';
import { SortablejsOptions } from 'angular-sortablejs';
import { CardMovementTypes } from '@app/backlog/container/backlog-cards-controller/backlog-cards-controller.component';

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

  @Output() cardMoveRequested = new EventEmitter<{ card: Card; cards: Card[]; newIndex: number }>();
  @Output() archiveOrDeleteCardRequested = new EventEmitter<Card>();
  @Output() cardSelectedRequested = new EventEmitter<Card>();

  canEditCards: boolean;
  canDeleteCards: boolean;
  canUpdateCards: boolean;

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
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.cards && !changes.cards.firstChange && this.list.id === 178857) {
      console.log('changes', changes.cards.currentValue, this.cards);
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

  cardSelected(card: Card) {
    this.cardSelectedRequested.emit(card);
  }

  isCardSelected(card: Card): boolean {
    return this.selectedCard.id === card.id;
  }

  private setPermissions() {
    this.canEditCards = this.config.config.CanEditTasks;
    this.canDeleteCards = this.config.config.CanDeleteTasks;
    this.canUpdateCards = this.config.config.CanUpdateTasks;

    this.sortableOptions.disabled = !this.canUpdateCards;
  }
}
