import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Board, Resources, Card, List } from '@app/models';

@Component({
  selector: 'td-cardwall-toolbar',
  templateUrl: './cardwall-toolbar.component.html',
  styleUrls: ['./cardwall-toolbar.component.scss'],
})
export class CardwallToolbarComponent implements OnInit, OnChanges {
  @Input() showResources: boolean;
  @Input() showTotals: boolean;
  @Input() board: Board;

  @Output() shouldShowResources = new EventEmitter<boolean>();
  @Output() shouldShowTotals = new EventEmitter<boolean>();

  resources: Resources[];
  selectedCardReduced: Card;

  constructor() {}

  ngOnInit() {
    this.getResourcesFromBoard();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.board && !changes.board.firstChange) {
      this.getResourcesFromBoard();
    }
  }

  toggleShowResources() {
    this.showResources === true ? this.shouldShowResources.emit(false) : this.shouldShowResources.emit(true);
  }

  toggleShowTotals() {
    this.showTotals === true ? this.shouldShowTotals.emit(false) : this.shouldShowTotals.emit(true);
  }

  private getResourcesFromBoard() {
    this.resources = this.board.resources;
  }
}
