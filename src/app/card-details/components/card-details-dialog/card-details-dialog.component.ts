import { Component, OnChanges, Input, Output, EventEmitter, SimpleChanges, ViewChild, AfterViewInit } from '@angular/core';

import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';

@Component({
  selector: 'td-card-details-dialog',
  templateUrl: './card-details-dialog.component.html',
  styleUrls: ['./card-details-dialog.component.scss'],
})
export class CardDetailsDialogComponent implements AfterViewInit, OnChanges {
  @Input() show: boolean;
  @Output() closeCardDetailsRequested = new EventEmitter<void>();

  @ViewChild('cardDetailsDialog') cardDetailsDialog;

  dialogRef: BsModalRef;
  dialogConfig: ModalOptions = {
    class: 'modal-lg',
    keyboard: true,
  };

  constructor(private dialogService: BsModalService) {}

  ngAfterViewInit() {
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
