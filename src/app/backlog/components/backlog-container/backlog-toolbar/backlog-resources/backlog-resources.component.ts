import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Resources, Plan, Card } from '@app/models';

import { filter, lowerCase } from 'lodash';

@Component({
  selector: 'td-backlog-resources',
  templateUrl: './backlog-resources.component.html',
  styleUrls: ['./backlog-resources.component.scss'],
})
export class BacklogResourcesComponent implements OnInit, OnChanges {
  @Input() resources: Resources[];
  @Input() plans: Plan[];
  @Input() selectedCard: Card;
  @Output() closeResourcesRequested = new EventEmitter<void>();

  resourcesFiltered: Resources[];
  selectedCardReduced: Card;

  @ViewChild('keepResources') keepResources: ElementRef;
  @ViewChild('replaceResources') replaceResources: ElementRef;

  ngOnInit() {
    this.resourcesFiltered = [...this.resources];
    this.updateSelectedCard();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.resources && !changes.resources.firstChange) {
      this.resourcesFiltered = [...this.resources];
    }

    if (changes.selectedCard && !changes.selectedCard.firstChange) {
      this.updateSelectedCard();
    }
  }

  closeResources() {
    this.closeResourcesRequested.emit();
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
