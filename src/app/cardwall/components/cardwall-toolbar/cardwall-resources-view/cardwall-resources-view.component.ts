import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Resources, Card, Board } from '@app/models';
import { FormGroup, FormControl } from '@angular/forms';

import { filter, lowerCase } from 'lodash';

@Component({
  selector: 'td-cardwall-resources-view',
  templateUrl: './cardwall-resources-view.component.html',
  styleUrls: ['./cardwall-resources-view.component.scss'],
})
export class CardwallResourcesViewComponent implements OnInit, OnChanges {
  @Input() resources: Resources[];
  @Input() board: Board;
  @Input() selectedCard: Card;

  @Output() closeResourcesRequested = new EventEmitter<void>();

  formGroup: FormGroup;
  selectedCardReduced: Card;
  resourcesFiltered: Resources[];

  constructor() {}

  ngOnInit() {
    this.resourcesFiltered = [...this.resources];
    this.updateSelectedCard();
    this.formGroup = new FormGroup({
      clearAssignments: new FormControl(false),
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.resources && !changes.resources.firstChange) {
      this.resourcesFiltered = [...this.resources];
    }

    if (changes.selectedCard && !changes.selectedCard.firstChange) {
      this.updateSelectedCard();
    }
  }

  searchResources(e) {
    const {
      target: { value },
    } = e;

    this.resourcesFiltered = [...this.resources];

    if (value === '') {
      return;
    } else {
      this.resourcesFiltered = filter(this.resourcesFiltered, resource => lowerCase(resource.name).includes(lowerCase(value)));
    }
  }

  closeResources() {
    this.closeResourcesRequested.emit();
  }

  private updateSelectedCard() {
    if (this.selectedCard === undefined) {
      this.selectedCardReduced = undefined;
      return;
    }
    if (this.selectedCard.owners && this.selectedCard.owners.length > 0) {
      this.selectedCardReduced = { ...this.selectedCard };
    } else {
      this.selectedCardReduced = undefined;
    }
  }
}
