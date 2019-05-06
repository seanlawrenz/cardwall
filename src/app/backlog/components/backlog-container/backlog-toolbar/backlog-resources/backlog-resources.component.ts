import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Resources, Plan, Card } from '@app/models';

import { filter, lowerCase } from 'lodash';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'td-backlog-resources',
  templateUrl: './backlog-resources.component.html',
  styleUrls: ['./backlog-resources.component.scss'],
})
export class BacklogResourcesComponent implements OnInit, OnChanges {
  @Input() resources: Resources[];
  @Input() plans: Plan[];
  @Input() selectedCard: Card;
  @Input() currentSelectedResource: Resources;

  @Output() closeResourcesRequested = new EventEmitter<void>();
  @Output() selectedResource = new EventEmitter<Resources>();

  resourcesFiltered: Resources[];
  selectedCardReduced: Card;
  formGroup: FormGroup;

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

  selectResource(resource: Resources) {
    this.selectedResource.emit(resource);
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
