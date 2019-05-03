import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { fromRoot } from '@app/store';
import * as selectors from '@app/card-details/state/selectors';
import * as actions from '@app/card-details/state/actions/attachment.actions';

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

  constructor(private store: Store<fromRoot.State>) {}

  ngOnInit() {
    this.store.dispatch(new actions.FetchAttachments(this.card));
    this.attachments$ = this.store.pipe(select(selectors.getAttachments));
    this.loading$ = this.store.pipe(select(selectors.isAttachmentsLoading));
    this.error$ = this.store.pipe(select(selectors.getAttachmentError));
  }
}
