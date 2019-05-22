import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subject, of } from 'rxjs';

import { fromRoot } from '@app/store';
import * as cardwallActions from '@app/cardwall/state/actions';
import * as cardwallSelectors from '@app/cardwall/state/selectors';

import { Card, Board, List, ErrorFromSignalR, SignalRResult } from '@app/models';
import { CardService, NotificationService } from '@app/app-services';
import { takeUntil, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'td-cardwall-cards-base',
  templateUrl: './cardwall-cards-base.component.html',
  styleUrls: ['./cardwall-cards-base.component.scss'],
})
export class CardwallCardsBaseComponent implements OnInit, OnDestroy {
  @Input() board: Board;
  @Input() list: List;

  saving$: Observable<boolean>;
  error$: Observable<ErrorFromSignalR>;

  unsubscribe$ = new Subject<void>();

  constructor(private store: Store<fromRoot.State>, private cardService: CardService, private notify: NotificationService) {}

  ngOnInit() {
    this.saving$ = this.store.pipe(select(cardwallSelectors.isCardsSaving));
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  /**
   * The end of a drag is called on the component that the drag originated from.
   * This card could be heading to a new list.
   */
  dragCardEnd(event: { card: Card; cards: Card[]; newIndex: number }) {
    const { card, cards, newIndex } = event;
    this.store.dispatch(new cardwallActions.CardMovementSave());
    if (card.listId === this.list.id) {
      this.cardService
        .moveCardWithInSameList(cards, newIndex)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(() => {
          this.store.dispatch(new cardwallActions.CardMovementEnd());
        });
    } else {
      this.store
        .select(cardwallSelectors.getListCards(card.listId))
        .pipe(
          takeUntil(this.unsubscribe$),
          mergeMap((newListCards: Card[]) => this.cardService.moveCardToListInSameBoard(newListCards, card, this.list.id, newIndex)),
          mergeMap((result: SignalRResult) => {
            if (result.isSuccessful) {
              return of(result);
            } else {
              this.notify.danger('Problem moving card', result.reason);
            }
          }),
        )
        .subscribe(() => this.store.dispatch(new cardwallActions.CardMovementEnd()));
    }
  }
}
