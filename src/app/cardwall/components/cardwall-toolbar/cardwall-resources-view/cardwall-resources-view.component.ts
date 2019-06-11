import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Resources } from '@app/models';
import { FormGroup, FormControl } from '@angular/forms';

import { filter, lowerCase } from 'lodash';

@Component({
  selector: 'td-cardwall-resources-view',
  templateUrl: './cardwall-resources-view.component.html',
  styleUrls: ['./cardwall-resources-view.component.scss'],
})
export class CardwallResourcesViewComponent implements OnInit {
  @Input() resources: Resources[];

  @Output() closeResourcesRequested = new EventEmitter<void>();

  formGroup: FormGroup;
  resourcesFiltered: Resources[];

  constructor() {}

  ngOnInit() {
    this.resourcesFiltered = [...this.resources];
    this.formGroup = new FormGroup({
      clearAssignments: new FormControl(false),
    });
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
}
