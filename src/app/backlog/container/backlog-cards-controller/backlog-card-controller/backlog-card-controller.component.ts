import { Component, OnInit, Input } from '@angular/core';
import { Card } from '@app/models';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromBacklog from '@app/backlog/state';
import * as backlogCardActions from '@app/backlog/state/actions/plan-card.actions';

@Component({
  selector: 'td-backlog-card-controller',
  templateUrl: './backlog-card-controller.component.html',
  styleUrls: ['./backlog-card-controller.component.scss'],
})
export class BacklogCardControllerComponent implements OnInit {
  @Input() card: Card;
  @Input() isOdd: boolean;

  // UI Settings
  showEstimateHours$: Observable<boolean>;
  showStoryPoints$: Observable<boolean>;

  constructor(private store: Store<fromBacklog.BacklogState>) {}

  ngOnInit() {
    this.showEstimateHours$ = this.store.pipe(select(fromBacklog.showEstimateHours));
    this.showStoryPoints$ = this.store.pipe(select(fromBacklog.showStoryPoints));
  }
}
