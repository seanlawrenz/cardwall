import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { Card, Plan, Board } from '@app/models';
import { Store } from '@ngrx/store';
import { fromRoot } from '@app/store';
import * as uiActions from '@app/store/actions/ui.actions';
import { FormGroup, FormControl, Validators, ValidatorFn } from '@angular/forms';
import { blankInputValidator } from '@app/utils';

@Component({
  selector: 'td-edit-form-base',
  templateUrl: './edit-form-base.component.html',
  styleUrls: ['./edit-form-base.component.scss'],
})
export class EditFormBaseComponent implements OnInit {
  @Input() card: Card;
  @Input() plan: Plan | Board;

  @Output() discardChangesRequested = new EventEmitter<void>();

  // Form
  cardForm: FormGroup;
  areDatesInvalid: boolean;

  // UI
  isSlideInShown = false;
  copyMoveType: string;

  constructor(private store: Store<fromRoot.State>, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.createForm();
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
    this.discardChangesRequested.emit();
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
}
