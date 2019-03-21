import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { fromRoot } from '@app/store';
import * as fromCardDetails from '@app/card-details/state/';
import * as actions from '@app/card-details/state/actions';
import { Card, CardDetailsPageTypes, Plan, Board } from '@app/models';

@Component({
  selector: 'td-card-details-base',
  templateUrl: './card-details-base.component.html',
  styleUrls: ['./card-details-base.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardDetailsBaseComponent implements OnInit {
  card$: Observable<Card>;
  plan$: Observable<Plan | Board>;
  cardDetailPage$: Observable<CardDetailsPageTypes>;
  constructor(private store: Store<fromRoot.State>) {}

  ngOnInit() {
    this.card$ = this.store.pipe(select(fromCardDetails.getCard));
    this.plan$ = this.store.pipe(select(fromCardDetails.getPlanFromCard));
    this.cardDetailPage$ = this.store.pipe(select(fromCardDetails.getCardDetailsPage));
  }

  updateCardDetailPage(type: CardDetailsPageTypes) {
    switch (type) {
      case CardDetailsPageTypes.FORM:
        this.store.dispatch(new actions.ShowForm());
        break;

      case CardDetailsPageTypes.FEED:
        this.store.dispatch(new actions.ShowFeed());
        break;

      case CardDetailsPageTypes.SUBTASKS:
        this.store.dispatch(new actions.ShowSubtasks());
        break;

      case CardDetailsPageTypes.WORK:
        this.store.dispatch(new actions.ShowWork());
        break;

      case CardDetailsPageTypes.ATTACHMENTS:
        this.store.dispatch(new actions.ShowAttachments());
        break;

      case CardDetailsPageTypes.ISSUES:
        this.store.dispatch(new actions.ShowIssues());
        break;

      case CardDetailsPageTypes.CODE:
        this.store.dispatch(new actions.ShowCode());
        break;

      default:
        return;
    }
  }
}
