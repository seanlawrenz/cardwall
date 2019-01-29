import { Component, OnInit, ChangeDetectionStrategy, TemplateRef } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { fromRoot } from '@app/store';
import * as fromBacklog from '../../state';
import * as backlogActions from '../../state/backlog.actions';

import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';

import { PlanIdentifier } from '@app/models';
import { NotificationService } from '@app/app-services/notification.service';

@Component({
  selector: 'td-add-board-base',
  templateUrl: './add-board-base.component.html',
  styleUrls: ['./add-board-base.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddBoardBaseComponent implements OnInit {
  // Store
  planIdentifiers$: Observable<PlanIdentifier[]>;
  errorMessage$: Observable<string>;
  loading$: Observable<boolean>;

  // Dialog
  dialogRef: BsModalRef;
  dialogConfig: ModalOptions = {
    class: 'modal-lg',
    keyboard: true,
  };

  constructor(
    private store: Store<fromBacklog.State>,
    private appStore: Store<fromRoot.State>,
    private dialogService: BsModalService,
    private notificationService: NotificationService,
  ) {}

  ngOnInit() {}

  addCardwallsRequested(template: TemplateRef<any>) {
    this.getAvailableBoards();
    this.dialogRef = this.dialogService.show(template, this.dialogConfig);
  }

  getAvailableBoards() {
    this.store.dispatch(new backlogActions.GetAvailableBoards());
    this.planIdentifiers$ = this.store.pipe(select(fromBacklog.getPlans));
    this.errorMessage$ = this.store.pipe(select(fromBacklog.getPlansError));
    this.loading$ = this.appStore.pipe(select(fromRoot.isLoading));
  }

  addPlansToBacklog(plans: PlanIdentifier[]) {
    if (plans.length === 0) {
      this.notificationService.warning('No Card Wall Selected', 'You must select at least 1 Cardwall to add');
      return;
    }

    if (plans.length > 10) {
      this.notificationService.warning(
        'Too many Cardwalls Selected',
        `You have ${plans.length} selected, but Backlog Manager can only add up to 10 at a time. Please select 10 and retry.`,
      );
      return;
    }

    this.dialogRef.hide();
  }
}
