import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Observable, Subject, concat } from 'rxjs';
import { takeUntil, map, debounceTime, distinctUntilChanged, tap, switchMap } from 'rxjs/operators';

import { SignalRService } from '@app/app-services';
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

  constructor(private signalR: SignalRService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.setUpForm();
    this.getResourceSuggestions();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onSubmit() {
    console.log(this.formGroup.value);
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
