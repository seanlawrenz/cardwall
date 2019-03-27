import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { Card, Plan, Board } from '@app/models';
import { Store } from '@ngrx/store';
import { fromRoot } from '@app/store';
import * as uiActions from '@app/store/actions/ui.actions';

@Component({
  selector: 'td-edit-form-base',
  templateUrl: './edit-form-base.component.html',
  styleUrls: ['./edit-form-base.component.scss'],
})
export class EditFormBaseComponent implements OnInit {
  @Input() card: Card;
  @Input() plan: Plan | Board;

  @Output() discardChangesRequested = new EventEmitter<void>();

  // UI
  isSlideInShown = false;
  copyMoveType: string;

  constructor(private store: Store<fromRoot.State>, private cdr: ChangeDetectorRef) {}

  ngOnInit() {}

  copyMoveRequested(type: string) {
    this.copyMoveType = type;
    this.showSlideIn();
  }

  showSlideIn() {
    this.isSlideInShown = true;
    setTimeout(() => {
      this.store.dispatch(new uiActions.ShowSlider());
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
}
