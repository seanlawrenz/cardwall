import { Component, OnInit, Input, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn } from '@angular/forms';

import { Store, select } from '@ngrx/store';
import { fromRoot } from '@app/store';
import * as fromCardDetails from '@app/card-details/state';
import * as uiActions from '@app/store/actions/ui.actions';
import * as cardDetailsActions from '@app/card-details/state/actions';

import { blankInputValidator } from '@app/utils';
import { Card, Plan, Board, SignalRResult } from '@app/models';
import { Subscription } from 'rxjs';
import { SignalRService, NotificationService } from '@app/app-services';

@Component({
  selector: 'td-edit-form-base',
  templateUrl: './edit-form-base.component.html',
  styleUrls: ['./edit-form-base.component.scss'],
})
export class EditFormBaseComponent implements OnInit, OnDestroy {
  @Input() card: Card;
  @Input() plan: Plan | Board;

  subs$ = new Subscription();

  // Form
  cardForm: FormGroup;
  areDatesInvalid: boolean;

  // UI
  isSlideInShown = false;
  copyMoveType: string;

  constructor(
    private store: Store<fromRoot.State>,
    private cdr: ChangeDetectorRef,
    private signalRService: SignalRService,
    private notificationService: NotificationService,
  ) {}

  ngOnInit() {
    this.createForm();
    this.subs$.add(
      this.store.pipe(select(fromCardDetails.getHideDetailsRequested)).subscribe(requested => {
        if (requested) {
          this.saveCardOnHideDetails();
        }
      }),
    );
  }

  ngOnDestroy() {
    this.subs$.unsubscribe();
  }

  copyMoveRequested(type: string) {
    this.copyMoveType = type;
    this.showSlideIn();
  }

  showSlideIn() {
    this.store.dispatch(new uiActions.ShowSlider());
    setTimeout(() => {
      this.isSlideInShown = true;
      this.cdr.markForCheck();
    }, 1);
  }

  hideSlideIn() {
    this.store.dispatch(new uiActions.HideSlider());
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
      if (this.cardForm.status === 'VALID' && this.cardForm.touched) {
        this.saveCard();
      }
      this.store.dispatch(new cardDetailsActions.HideDetails());
    }
  }

  saveCard() {
    if (this.cardForm.touched) {
      const card = this.updateThisCard();
      this.subs$.add(
        this.signalRService.invoke('CardUpdate', card, this.plan.useRemainingHours, null).subscribe((response: SignalRResult) => {
          if (response.isSuccessful) {
            this.notificationService.success(`Card Updated`, `Card ${card.name} ID: ${this.card.id} has been updated`, 4);
            this.cardForm.markAsUntouched();
          } else {
            this.notificationService.danger('Could not update', response.message);
          }
          this.cdr.markForCheck();
        }),
      );
    }
  }

  private createForm() {
    this.cardForm = new FormGroup({
      name: new FormControl(this.card.name, [Validators.required, blankInputValidator]),
      description: new FormControl(this.card.description),
      startDate: new FormControl(this.card.startDate),
      endDate: new FormControl(this.card.endDate),
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
    });
    this.isStartDateAfterEndDate();
  }

  private isStartDateAfterEndDate(): ValidatorFn {
    return (group: FormGroup): { [key: string]: any } => {
      if (!this.card.startDate || !this.card.endDate) {
        this.areDatesInvalid = false;
        return {};
      }

      let start: Date;
      if (typeof this.card.startDate === 'string') {
        start = new Date(<string>this.card.startDate);
      } else {
        start = this.card.startDate;
      }

      let end: Date;
      if (typeof this.card.endDate === 'string') {
        end = new Date(<string>this.card.endDate);
      } else {
        end = this.card.endDate;
      }

      this.areDatesInvalid = start > end;

      if (this.areDatesInvalid) {
        return {
          startDate: 'Start date cannot be after end date',
        };
      } else {
        return {};
      }
    };
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
}
