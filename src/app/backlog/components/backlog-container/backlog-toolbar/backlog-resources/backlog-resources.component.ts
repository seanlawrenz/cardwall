import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Resources, Plan } from '@app/models';

import { filter, lowerCase } from 'lodash';

@Component({
  selector: 'td-backlog-resources',
  templateUrl: './backlog-resources.component.html',
  styleUrls: ['./backlog-resources.component.scss'],
})
export class BacklogResourcesComponent implements OnInit {
  @Input() resources: Resources[];
  @Input() plans: Plan[];
  resourcesFiltered: Resources[];

  @ViewChild('keepResources') keepResources: ElementRef;
  @ViewChild('replaceResources') replaceResources: ElementRef;

  ngOnInit() {
    this.resourcesFiltered = [...this.resources];
  }

  closeResources() {}

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
}
