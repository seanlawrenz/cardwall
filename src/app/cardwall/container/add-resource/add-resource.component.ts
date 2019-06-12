import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subject, concat, of } from 'rxjs';
import { takeUntil, map, debounceTime, distinctUntilChanged, tap, switchMap } from 'rxjs/operators';

import { fromRoot } from '@app/store';
import * as cardwallActions from '@app/cardwall/state/actions';

import { SignalRService, NotificationService } from '@app/app-services';
import { Board, Resources, SignalRResult } from '@app/models';

@Component({
  selector: 'td-add-resource',
  templateUrl: './add-resource.component.html',
  styleUrls: ['./add-resource.component.scss'],
})
export class AddResourceComponent implements OnInit, OnDestroy {
  @Input() board: Board;

  @Output() closeAddResources = new EventEmitter<void>();

  resources$: Observable<Resources[]>;
  resourceInput$ = new Subject<any>();
  unsubscribe$ = new Subject<void>();

  formGroup: FormGroup;
  loading = false;

  constructor(
    private signalR: SignalRService,
    private cdr: ChangeDetectorRef,
    private notify: NotificationService,
    private store: Store<fromRoot.State>,
  ) {}

  ngOnInit() {
    this.setUpForm();
    this.getResourceSuggestions();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onSubmit() {
    const {
      value: { resources },
    } = this.formGroup;
    const uids = resources.map(resource => resource.uid);
    this.signalR
      .invoke('AssignResources', this.board.projectId, uids)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((result: SignalRResult) => {
        if (result.isSuccessful) {
          let resourcesNeededForApproval = [];
          if (result.item.length > 0) {
            resourcesNeededForApproval = resources.filter((r: Resources) => result.item.indexOf(r.uid) !== -1);
            let message = '';
            if (resourcesNeededForApproval.length > 0) {
              resourcesNeededForApproval.map((resource: Resources) => {
                message += `${resource.name} needs approval to be added <br/>`;
              });
            }
            const notifyHeader: string =
              resourcesNeededForApproval.length === resources.length ? 'Resource(s) Requested' : 'Resources(s) Added or Requested';
            const resourcesToAdd: Resources[] = resources.filter((r: Resources) => result.item.indexOf(r.uid) >= 0);
            this.store.dispatch(new cardwallActions.AddResourcesToBoard(resourcesToAdd));
            this.notify.warning(notifyHeader, message);
          } else {
            this.store.dispatch(new cardwallActions.AddResourcesToBoard(resources));
            this.notify.success('Resource(s) Added', '', 5);
          }
        } else {
          this.notify.danger('Could not add resource', result.reason ? result.reason : result.message);
        }
        this.closeAddResources.emit();
      });
  }

  cancel() {
    this.closeAddResources.emit();
  }

  private setUpForm() {
    this.formGroup = new FormGroup({
      resources: new FormControl('', Validators.required),
    });
  }

  private getResourceSuggestions() {
    this.resources$ = concat(
      this.signalR.invoke('GetUsersAvailableForProject', '', this.board.projectId).pipe(map((result: SignalRResult) => result.item)),
      this.resourceInput$.pipe(
        debounceTime(200),
        distinctUntilChanged(),
        tap(() => ((this.loading = true), this.cdr.markForCheck())),
        switchMap(term =>
          this.signalR.invoke('GetUsersAvailableForProject', term, this.board.projectId).pipe(
            takeUntil(this.unsubscribe$),
            map((result: SignalRResult) => result.item),
            tap(() => (this.loading = false)),
          ),
        ),
      ),
    );
  }
}
