import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { fromRoot } from '@app/store';
import * as fromCardDetails from '@app/card-details/state/';
import * as actions from '@app/card-details/state/actions';

@Component({
  selector: 'td-card-details-dialog-base',
  templateUrl: './card-details-dialog-base.component.html',
  styleUrls: ['./card-details-dialog-base.component.scss'],
})
export class CardDetailsDialogBaseComponent implements OnInit {
  showDetails$: Observable<boolean>;

  constructor(private store: Store<fromRoot.State>) {}

  ngOnInit() {
    this.showDetails$ = this.store.pipe(select(fromCardDetails.getShowDetails));
  }

  closeCardDetails() {
    this.store.dispatch(new actions.HideDetails());
  }
}
