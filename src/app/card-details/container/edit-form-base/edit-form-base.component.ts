import { Component, OnInit, Input, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';
import { fromRoot } from '@app/store';
import * as fromCardDetails from '@app/card-details/state';
import * as rootActions from '@app/store/actions';
import * as cardDetailsActions from '@app/card-details/state/actions';

import { blankInputValidator } from '@app/utils';
import { Card, Plan, Board, ErrorFromSignalR, CardDetailsPageTypes } from '@app/models';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NotificationService } from '@app/app-services';

@Component({
  selector: 'td-edit-form-base',
  templateUrl: './edit-form-base.component.html',
  styleUrls: ['./edit-form-base.component.scss'],
})
export class EditFormBaseComponent implements OnInit, OnDestroy {
  @Input() card: Card;
  @Input() plan: Plan | Board;
  unsubscribe$ = new Subject<void>();

  // Form
  cardForm: FormGroup;
  areDatesInvalid: boolean;
  startDate;
  endDate;

  // UI
  isSlideInShown = false;
  copyMoveType: string;

  constructor(private store: Store<fromRoot.State>, private cdr: ChangeDetectorRef, private notify: NotificationService) {}

  ngOnInit() {
    this.createForm();
    this.store
      .select(fromCardDetails.getHideDetailsRequested)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(requested => {
        if (requested) {
          this.saveCardOnHideDetails();
        }
      });

    this.store
      .select(fromCardDetails.getCardSaveError)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((error: ErrorFromSignalR) => {
        if (error) {
          this.notify.danger(error.message, error.reason);
        }
      });

    this.store
      .select(fromCardDetails.getCardDetailsPage)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((page: CardDetailsPageTypes) => {
        if (page !== CardDetailsPageTypes.FORM) {
          if (this.cardForm.status === 'VALID' && this.cardForm.dirty) {
            this.saveCard();
          }
        }
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  addRemoveFromWork(type: string) {
    const add: boolean = type === 'add';

    if (add) {
      this.store.dispatch(new cardDetailsActions.AddToMyWork({ card: this.card, plan: this.plan }));
    } else {
      this.store.dispatch(new cardDetailsActions.RemoveFromMyWork({ card: this.card, plan: this.plan }));
    }
  }

  copyMoveRequested(type: string) {
    this.copyMoveType = type;
    this.showSlideIn();
  }

  showSlideIn() {
    this.store.dispatch(new rootActions.ShowSlider());
    setTimeout(() => {
      this.isSlideInShown = true;
      this.cdr.markForCheck();
    }, 1);
  }

  hideSlideIn() {
    this.store.dispatch(new rootActions.HideSlider());
    setTimeout(() => {
      this.isSlideInShown = false;
    }, 500);
  }

  discardChanges() {
    // Bypassing hideDetailsRequested
    this.store.dispatch(new cardDetailsActions.HideDetails());
  }

  saveCardOnHideDetails() {
    if (this.cardForm.status !== 'INVALID') {
      if (this.cardForm.status === 'VALID' && this.cardForm.dirty) {
        this.saveCard();
      }
      this.store.dispatch(new cardDetailsActions.HideDetails());
    }
  }

  saveCard() {
    if (this.cardForm.touched) {
      const card = this.updateThisCard();
      this.store.dispatch(new cardDetailsActions.SaveCard({ card, useRemainingHours: this.plan.useRemainingHours }));
    }
  }

  archiveCard() {
    const card = { ...this.card };
    this.store.dispatch(new cardDetailsActions.HideDetails());
    this.store.dispatch(new rootActions.ArchiveCard({ card, plan: this.plan }));
  }

  private createForm() {
    // There is not a date picker than can handle ISO strings
    this.startDate = this.card.startDate ? new Date(this.card.startDate) : '';
    this.endDate = this.card.endDate ? new Date(this.card.endDate) : '';

    this.cardForm = new FormGroup(
      {
        name: new FormControl(this.card.name, [Validators.required, blankInputValidator]),
        description: new FormControl(this.card.description),
        startDate: new FormControl(this.startDate),
        endDate: new FormControl(this.endDate),
        estimatedHrs: new FormControl(this.card.estimatedHours, [Validators.required, Validators.min(0), Validators.max(2147483647)]),
        remainingHrs: new FormControl(this.card.remainingHours, Validators.required),
        percentComplete: new FormControl(this.card.percentComplete, [Validators.required, Validators.min(0), Validators.max(100)]),
        priorityId: new FormControl(this.card.priorityId),
        isStory: new FormControl(this.card.isStory),
        storyPoints: new FormControl(this.card.storyPoints, [Validators.required, Validators.min(0), Validators.max(2147483647)]),
        valuePoints: new FormControl(this.card.valuePoints, [Validators.required, Validators.min(0), Validators.max(2147483647)]),
        owners: new FormControl(this.card.owners),
        tags: new FormControl(this.card.tags),
        cssClass: new FormControl(this.card.cssClass),
      },
      { validators: this.startDateAfterEndDate('startDate', 'endDate') },
    );
  }

  /**
   * Ensures immutability. Grabs the values of the form and creates new card.
   */
  private updateThisCard(): Card {
    const {
      name,
      description,
      startDate,
      endDate,
      estimatedHrs,
      remainingHrs,
      percentComplete,
      priorityId,
      isStory,
      storyPoints,
      valuePoints,
      owners,
      tags,
      cssClass,
    } = this.cardForm.value;
    return {
      ...this.card,
      name,
      description,
      startDate,
      endDate,
      estimatedHours: estimatedHrs,
      remainingHours: remainingHrs,
      percentComplete,
      priorityId,
      isStory,
      storyPoints,
      valuePoints,
      owners,
      tags,
      cssClass,
    };
  }

  startDateAfterEndDate(startDate: string, endDate: string) {
    return (group: FormGroup): { [key: string]: any } => {
      const f = group.controls[startDate];
      const t = group.controls[endDate];
      if (t.value !== undefined) {
        if (t.value !== '') {
          if (f.value > t.value) {
            return {
              dates: 'Start date cannot be after end date',
            };
          }
        }
      }
      return {};
    };
  }
}
