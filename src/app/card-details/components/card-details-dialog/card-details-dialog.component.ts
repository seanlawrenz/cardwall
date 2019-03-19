import { Component, OnChanges, Input, Output, EventEmitter, SimpleChanges, ViewChild, HostListener, OnInit } from '@angular/core';

import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';

@Component({
  selector: 'td-card-details-dialog',
  templateUrl: './card-details-dialog.component.html',
  styleUrls: ['./card-details-dialog.component.scss'],
})
export class CardDetailsDialogComponent implements OnInit, OnChanges {
  @Input() show: boolean;
  @Output() closeCardDetailsRequested = new EventEmitter<void>();

  @ViewChild('cardDetailsDialog') cardDetailsDialog;

  dialogRef: BsModalRef;
  dialogConfig: ModalOptions = {
    class: 'modal-lg',
    keyboard: true,
    ignoreBackdropClick: true,
  };

  @HostListener('window:click', ['$event.target'])
  isBackDropClick(target: Element) {
    if (target.classList.contains('modal')) {
      this.closeCardDetailsRequested.emit();
    }
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
        // This is a hack for removing Angular's expressionChangedAfterItHasBeenChecked.
        setTimeout(() => {
          this.openDialog();
        }, 1);
      } else {
        this.closeDialog();
      }
    }
  }

  closeDialogReq() {
    this.closeCardDetailsRequested.emit();
  }

  private openDialog() {
    this.dialogRef = this.dialogService.show(this.cardDetailsDialog, this.dialogConfig);
  }

  private closeDialog() {
    if (this.dialogRef) {
      this.dialogRef.hide();
    }
  }
}
