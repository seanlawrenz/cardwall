import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Board, Resources, Card } from '@app/models';

@Component({
  selector: 'td-cardwall-toolbar',
  templateUrl: './cardwall-toolbar.component.html',
  styleUrls: ['./cardwall-toolbar.component.scss'],
})
export class CardwallToolbarComponent implements OnInit {
  @Input() showResources: boolean;
  @Input() board: Board;
  @Input() selectedCard: Card;

  @Output() shouldShowResources = new EventEmitter<boolean>();

  resources: Resources[];
  selectedCardReduced: Card;

  constructor() {}

  ngOnInit() {
    this.getResourcesFromBoard();
  }

  showResourcesRequested() {
    this.showResources === true ? this.shouldShowResources.emit(false) : this.shouldShowResources.emit(true);
  }

  private getResourcesFromBoard() {
    this.resources = this.board.resources;
  }
}
