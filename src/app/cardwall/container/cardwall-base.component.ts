import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';

import { fromRoot } from '@app/store';

import * as boardActions from '@app/cardwall/state/actions';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cardwall-base',
  templateUrl: './cardwall-base.component.html',
  styleUrls: ['./cardwall-base.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardwallBaseComponent implements OnInit {
  constructor(private store: Store<fromRoot.State>, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.store.dispatch(new boardActions.GetBoard());
  }

  goToCard(id) {
    this.router.navigate(['card', id], { relativeTo: this.route });
  }
}
