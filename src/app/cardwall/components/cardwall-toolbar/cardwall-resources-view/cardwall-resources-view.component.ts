import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Resources } from '@app/models';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'td-cardwall-resources-view',
  templateUrl: './cardwall-resources-view.component.html',
  styleUrls: ['./cardwall-resources-view.component.scss'],
})
export class CardwallResourcesViewComponent implements OnInit {
  @Input() resources: Resources[];

  @Output() closeResourcesRequested = new EventEmitter<void>();

  formGroup: FormGroup;

  constructor() {}

  ngOnInit() {
    this.formGroup = new FormGroup({
      clearAssignments: new FormControl(false),
    });
  }

  closeResources() {
    this.closeResourcesRequested.emit();
  }
}
