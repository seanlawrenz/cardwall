import {
  Component,
  OnChanges,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
  ViewChild,
  HostListener,
  OnInit,
  OnDestroy,
} from '@angular/core';

import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { CardDetailsBaseComponent } from '@app/card-details/container/card-details-base/card-details-base.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'td-card-details-dialog',
  templateUrl: './card-details-dialog.component.html',
  styleUrls: ['./card-details-dialog.component.scss'],
})
export class CardDetailsDialogComponent implements OnInit, OnChanges, OnDestroy {
  @Input() show: boolean;
  @Output() closeCardDetailsRequested = new EventEmitter<void>();
  @Output() detailsHidden = new EventEmitter<void>();

  unsubscribe$ = new Subject<void>();

  dialogRef: BsModalRef;
  dialogConfig: ModalOptions = {
    class: 'modal-lg',
    keyboard: false,
    ignoreBackdropClick: true,
  };

  @HostListener('window:click', ['$event.target'])
  isBackDropClick(target: Element) {
    if (target.classList.contains('modal')) {
      this.closeCardDetailsRequested.emit();
    }
  }

  @HostListener('document:keydown.escape', ['$event'])
  onEscapePress(event: KeyboardEvent) {
    this.closeCardDetailsRequested.emit();
  }
  constructor(private dialogService: BsModalService) {}

  ngOnInit() {
    if (this.show) {
      this.openDialog();
    } else {
      this.closeDialog();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.show && !changes.show.firstChange) {
      if (this.show) {
        this.openDialog();
      } else {
        this.closeDialog();
      }
    }
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  closeDialogReq() {
    this.closeCardDetailsRequested.emit();
  }

  private openDialog() {
    this.dialogRef = this.dialogService.show(CardDetailsBaseComponent, this.dialogConfig);

    this.dialogService.onHidden.pipe(takeUntil(this.unsubscribe$)).subscribe(() => this.detailsHidden.emit());
  }

  private closeDialog() {
    if (this.dialogRef) {
      this.dialogRef.hide();
    }
  }
}
