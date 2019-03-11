import { Component, OnInit, ChangeDetectionStrategy, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { fromRoot } from '@app/store';
import * as fromBacklog from '../../state';

import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';

import { NotificationService } from '@app/app-services/notification.service';
import { PlanIdentifier } from '@app/models';

import { join } from 'lodash';

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
    private store: Store<fromBacklog.BacklogState>,
    private dialogService: BsModalService,
    private notificationService: NotificationService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {}

  addCardwallsRequested(template: TemplateRef<any>) {
    this.getAvailableBoards();
    this.dialogRef = this.dialogService.show(template, this.dialogConfig);
  }

  getAvailableBoards() {
    this.store.dispatch(new fromBacklog.GetAvailablePlanIdentifers());
    this.planIdentifiers$ = this.store.pipe(select(fromBacklog.getPlanIdentifiers));
    this.errorMessage$ = this.store.pipe(select(fromBacklog.getPlanIdentifiersError));
    this.loading$ = this.store.pipe(select(fromRoot.isLoading));
  }

  addPlansToBacklog(plans: PlanIdentifier[]): string {
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

    let createQueryParams = join(plans.map(plan => `${plan.projectID}_${plan.planID}`));
    const currentParams = this.route.snapshot.queryParamMap.get('boards');

    if (currentParams !== null && currentParams !== '') {
      createQueryParams = `${currentParams},${createQueryParams}`;
    }
    this.router.navigate([], { relativeTo: this.route, queryParams: { boards: createQueryParams }, queryParamsHandling: 'merge' });

    this.store.dispatch(new fromBacklog.AddPlan(createQueryParams));

    this.dialogRef.hide();
  }
}
