import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { fromRoot } from '@app/store';
import * as selectors from '@app/card-details/state/selectors';
import * as actions from '@app/card-details/state/actions/attachment.actions';
import * as uiActions from '@app/store/actions/ui.actions';

import { Attachment, ErrorFromSignalR, Card } from '@app/models';

@Component({
  selector: 'td-attachments-base',
  templateUrl: './attachments-base.component.html',
  styleUrls: ['./attachments-base.component.scss'],
})
export class AttachmentsBaseComponent implements OnInit {
  @Input() card: Card;

  attachments$: Observable<Attachment[]>;
  loading$: Observable<boolean>;
  error$: Observable<ErrorFromSignalR>;

  isSlideInShown = false;

  constructor(private store: Store<fromRoot.State>, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.store.dispatch(new actions.FetchAttachments(this.card));
    this.attachments$ = this.store.pipe(select(selectors.getAttachments));
    this.loading$ = this.store.pipe(select(selectors.isAttachmentsLoading));
    this.error$ = this.store.pipe(select(selectors.getAttachmentError));
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
}
