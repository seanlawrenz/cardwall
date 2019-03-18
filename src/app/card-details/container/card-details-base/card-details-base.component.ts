import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { fromRoot } from '@app/store';
import * as fromCardDetails from '@app/card-details/state/';

@Component({
  selector: 'td-card-details-base',
  templateUrl: './card-details-base.component.html',
  styleUrls: ['./card-details-base.component.scss'],
})
export class CardDetailsBaseComponent implements OnInit {
  showDetails$: Observable<boolean>;
  constructor(private store: Store<fromRoot.State>) {}

  ngOnInit() {
    this.showDetails$ = this.store.pipe(select(fromCardDetails.getShowDetails));
  }
}
