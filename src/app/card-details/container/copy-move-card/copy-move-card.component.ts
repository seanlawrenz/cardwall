import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';

import { Store } from '@ngrx/store';
import { fromRoot } from '@app/store';
import * as fromCardDetails from '@app/card-details/state';
import * as actions from '@app/card-details/state/actions';

import { Card, Plan, Board, List, Project, SignalRResult } from '@app/models';

import { Observable, Subscription } from 'rxjs';
import { find, maxBy } from 'lodash';
import { map } from 'rxjs/operators';
import { NotificationService, CardService, SignalRService, ConfigService } from '@app/app-services';

@Component({
  selector: 'td-copy-move-card',
  templateUrl: './copy-move-card.component.html',
  styleUrls: ['./copy-move-card.component.scss'],
})
export class CopyMoveCardComponent implements OnInit, OnDestroy {
  @Input() card: Card;
  @Input() plan: Plan | Board;
  @Input() mode: string;

  projects$: Observable<Project[]>;
  plans$: Observable<Plan[]>;
  lists$: Observable<List[]>;
  loading$: Observable<boolean>;
  plansLoading$: Observable<boolean>;
  listsLoading$: Observable<boolean>;
  subs$: Subscription = new Subscription();
  error$: Observable<any>;

  @Output() closeCopyMoveSlider = new EventEmitter<void>();

  isTemplate: boolean;

  constructor(
    private store: Store<fromRoot.State>,
    private notify: NotificationService,
    private cardService: CardService,
    private signalR: SignalRService,
    private teamDynamix: ConfigService,
  ) {}

  ngOnInit() {
    const isTemplate = this.plan.isTemplate;
    this.store.dispatch(new actions.GetProjects({ isTemplate }));

    this.projects$ = this.store.select(fromCardDetails.getProjects);
    this.plans$ = this.store.select(fromCardDetails.getPlans);
    this.lists$ = this.store.select(fromCardDetails.getLists);
    this.loading$ = this.store.select(fromCardDetails.getCopyMoveLoading);
    this.plansLoading$ = this.store.select(fromCardDetails.getPlansLoading);
    this.listsLoading$ = this.store.select(fromCardDetails.getListsLoading);
    this.error$ = this.store.select(fromCardDetails.getError).pipe(map(error => console.log(error)));
  }

  ngOnDestroy() {
    this.subs$.unsubscribe();
  }

  fetchPlans(event) {
    this.store.dispatch(new actions.GetPlans({ projectID: event }));
  }

  fetchLists(event: { projectId: number; planId: number }) {
    this.store.dispatch(new actions.GetLists({ projectId: event.projectId, planId: event.planId }));
  }

  hide() {
    this.closeCopyMoveSlider.emit();
  }

  copyMoveCard({ projectId, planId, listId }) {
    this.store.dispatch(new actions.CopyMoveCard());
    const card = { ...this.card };
    switch (this.mode) {
      case 'copy':
        this.subs$.add(
          this.cardService.copyCard(card, projectId, planId, listId).subscribe(result => {
            const { isSuccessful, message } = result;
            if (isSuccessful) {
              this.store.dispatch(new actions.CopyMoveCardSuccess());
              this.notify.success('Card Copied', `${card.name} was successfully copied`);
            } else {
              this.store.dispatch(new actions.CopyMoveCardError(message));
              this.notify.danger('Problem coping card', message);
            }
          }),
        );
        break;

      case 'move':
        // Moved to Same board
        if (card.planId === planId) {
          if (card.listId !== listId) {
            card.listId = listId;
            // Update the order
            card.order = 1;
            const list: List = find(this.plan.lists, l => l.id === listId);
            if (list.cards.length > 0) {
              let maxOrderNumber: number = maxBy(list.cards, c => c.order).order;
              maxOrderNumber++;
              card.order = maxOrderNumber;
            }
            this.subs$.add(
              this.signalR.invoke('CardUpdate', card, this.plan.useRemainingHours, null).subscribe((result: SignalRResult) => {
                const { isSuccessful, message } = result;
                if (isSuccessful) {
                  this.store.dispatch(new actions.CopyMoveCardSuccess());
                  this.store.dispatch(new actions.HideDetails());
                  this.notify.success('Card Moved', message, 5);
                } else {
                  this.store.dispatch(new actions.CopyMoveCardError(message));
                  this.notify.danger('Card could not be moved', message);
                }
              }),
            );
          } else {
            this.notify.danger('Cannot move Card', 'Card cannot move to same list');
          }
        } else {
          this.subs$.add(
            this.signalR.invoke('CardMove', card, projectId, planId, listId, false).subscribe((result: SignalRResult) => {
              const { isSuccessful, item, message } = result;
              if (isSuccessful) {
                this.store.dispatch(new actions.CopyMoveCardSuccess());
                this.store.dispatch(new actions.HideDetails());
                this.notify.success('Card Moved', message, 5, this.constructNavigateToBoardFunction(item));
              } else {
                this.store.dispatch(new actions.CopyMoveCardError(message));
                this.notify.danger('Card could not be moved', message);
              }
            }),
          );
        }
    }
  }

  private constructBoardUrl(card: Card): string {
    return `${this.teamDynamix.config.BasePath}Apps/Projects/Agile/cardwall/project/${card.projectId}/board/${card.planId}/card/${card.id}`;
  }

  private constructNavigateToBoardFunction(card: Card): any {
    const url: string = this.constructBoardUrl(card);

    return () => {
      window.open(url);
    };
  }
}
