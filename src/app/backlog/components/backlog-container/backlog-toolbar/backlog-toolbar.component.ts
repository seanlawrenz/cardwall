import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Resources, Plan } from '@app/models';

@Component({
  selector: 'td-backlog-toolbar',
  templateUrl: './backlog-toolbar.component.html',
  styleUrls: ['./backlog-toolbar.component.scss'],
})
export class BacklogToolbarComponent implements OnInit {
  @Input() showResources: boolean;
  @Input() showTotals: boolean;
  @Input() resources: Resources[];
  @Input() plans: Plan[];

  @Output() shouldShowResources = new EventEmitter<boolean>();
  @Output() shouldShowTotals = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit() {}

  showResourcesRequested() {
    this.showResources === true ? this.shouldShowResources.emit(false) : this.shouldShowResources.emit(true);
  }

  showTotalsRequested() {
    this.showTotals === true ? this.shouldShowTotals.emit(false) : this.shouldShowTotals.emit(true);
  }
}
