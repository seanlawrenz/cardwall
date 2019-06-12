import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';

import { fromRoot } from '@app/store';
import * as rootActions from '@app/store/actions';
import * as rootSelectors from '@app/store/selectors';

import { Resources, Card, Board } from '@app/models';
import { FormGroup, FormControl } from '@angular/forms';

import { filter, lowerCase } from 'lodash';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'td-cardwall-resources-view',
  templateUrl: './cardwall-resources-view.component.html',
  styleUrls: ['./cardwall-resources-view.component.scss'],
})
export class CardwallResourcesViewComponent implements OnInit, OnChanges, OnDestroy {
  @Input() resources: Resources[];
  @Input() board: Board;

  @Output() closeResourcesRequested = new EventEmitter<void>();

  unsubscribe$ = new Subject<void>();

  formGroup: FormGroup;
  selectedCardReduced: Card;
  selectedResource: Resources;
  resourcesFiltered: Resources[];
  showAddResources = false;

  constructor(private store: Store<fromRoot.State>) {}

  ngOnInit() {
    this.resourcesFiltered = [...this.resources];
    this.formGroup = new FormGroup({
      clearAssignments: new FormControl(false),
    });

    this.store
      .select(rootSelectors.getCurrentResource)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((resource: Resources) => (this.selectedResource = resource));
    this.store
      .select(rootSelectors.getSelectedCard)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((selectedCard: Card) => this.updateSelectedCard(selectedCard));
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.resources && !changes.resources.firstChange) {
      this.resourcesFiltered = [...this.resources];
    }
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
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

  toggleShowAddResources() {
    this.showAddResources = this.showAddResources === true ? false : true;
  }

  selectResource(resource: Resources) {
    this.store.dispatch(new rootActions.SelectedResource(resource));
  }

  private updateSelectedCard(selectedCard: Card) {
    if (selectedCard === undefined) {
      this.selectedCardReduced = undefined;
      return;
    }
    if (selectedCard.owners && selectedCard.owners.length > 0) {
      this.selectedCardReduced = { ...selectedCard };
    } else {
      this.selectedCardReduced = undefined;
    }
  }
}
