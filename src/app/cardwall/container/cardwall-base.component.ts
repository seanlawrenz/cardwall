import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ElementRef, ViewChild, AfterViewInit, Renderer2 } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';

import { fromRoot } from '@app/store';
import * as cardwallActions from '@app/cardwall/state/actions';
import * as cardwallSelectors from '@app/cardwall/state/selectors';
import * as rootActions from '@app/store/actions';
import * as rootSelectors from '@app/store/selectors';

import { Board } from '@app/models';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-cardwall-base',
  templateUrl: './cardwall-base.component.html',
  styleUrls: ['./cardwall-base.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardwallBaseComponent implements OnInit, AfterViewInit, OnDestroy {
  board$: Observable<Board>;
  loading$: Observable<boolean>;
  saving$: Observable<boolean>;

  unsubscribe$ = new Subject<void>();

  selectedCardElement: ElementRef;

  @ViewChild('nav', { read: ElementRef }) private navbar: ElementRef;
  @ViewChild('sideBar', { read: ElementRef }) private sideBar: ElementRef;
  @ViewChild('settings', { read: ElementRef }) private settings: ElementRef;

  constructor(
    private store: Store<fromRoot.State>,
    private router: Router,
    private route: ActivatedRoute,
    private renderer: Renderer2,
    private element: ElementRef,
  ) {}

  ngOnInit() {
    this.store.dispatch(new cardwallActions.GetBoard());
    this.board$ = this.store.pipe(select(cardwallSelectors.getBoard));
    this.loading$ = this.store.pipe(select(cardwallSelectors.isBoardLoading));
    this.saving$ = this.store.pipe(select(cardwallSelectors.isSaving));
    this.store
      .select(rootSelectors.getSelectedCardElement)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((element: ElementRef) => (this.selectedCardElement = element));
  }

  ngAfterViewInit() {
    this.renderer.listen(this.element.nativeElement, 'click', e => {
      const { target } = e;
      if (this.selectedCardElement && this.selectedCardElement.nativeElement) {
        if (
          !this.selectedCardElement.nativeElement.contains(target) &&
          !this.navbar.nativeElement.contains(target) &&
          !this.sideBar.nativeElement.contains(target) &&
          !this.settings.nativeElement.contains(target)
        ) {
          this.store.dispatch(new rootActions.CardSelected({ card: undefined, element: undefined }));
        }
      }
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  editBoard(board: Board) {
    this.store.dispatch(new cardwallActions.EditBoardName(board));
  }

  showOptions() {
    this.store.dispatch(new rootActions.ShowOptions());
  }
}
