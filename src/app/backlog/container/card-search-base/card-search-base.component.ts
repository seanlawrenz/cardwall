import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { fromRoot } from '@app/store';
import * as actions from '@app/backlog/state/actions';

@Component({
  selector: 'td-card-search-base',
  templateUrl: './card-search-base.component.html',
  styleUrls: ['./card-search-base.component.scss'],
})
export class CardSearchBaseComponent implements OnInit {
  constructor(private store: Store<fromRoot.State>) {}

  ngOnInit() {}

  search(term) {
    this.store.dispatch(new actions.SearchPlans(term));
  }
}
