import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { BsModalService, ModalOptions, BsModalRef } from 'ngx-bootstrap/modal';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'td-iframe-dialog',
  templateUrl: './iframe-dialog.component.html',
  styleUrls: ['./iframe-dialog.component.scss'],
})
export class IframeDialogComponent implements OnInit {
  @Input() title: string;
  @Input() size: string;
  @Input() url: string;

  @Output() dialogClosed = new EventEmitter<void>();

  openingElement;
  isLoading = true;
  dialogRef: BsModalRef;
  dialogConfig: ModalOptions;
  safeUrl: SafeResourceUrl;
  initialState;

  constructor(private dialogService: BsModalService, private sanitizer: DomSanitizer) {}

  ngOnInit() {
    if (this.url) {
      this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
    }
  }

  showIFrameRequested() {
    const initialState = {
      url: this.safeUrl,
      title: this.title,
    };
    this.dialogRef = this.dialogService.show(IframeContentComponent, { initialState });
    this.dialogRef.setClass(this.size || 'modal-lg');
  }
}

@Component({
  selector: 'iframe-content',
  template: `
    <div class="modal-header">
      <h3 id="dialog-name">{{ title }}</h3>
      <button type="button" class="close pull-right" (click)="bsModalRef.hide()" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div>
      <div *ngIf="isLoading">
        <div class="loading-component-container">
          <span class="td-icon td-loading"></span>
        </div>
      </div>
      <iframe
        #iframe
        [src]="url"
        sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-modals"
        style="height: 100%; width: 100%; border: none;"
        [ngClass]="{ 'min-iFrame-height': !isLoading }"
      ></iframe>
    </div>
  `,
})
export class IframeContentComponent implements OnInit {
  url;
  title;
  autoResize;
  @ViewChild('iframe') iframe: ElementRef;
  isLoading = true;
  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit() {
    this.iframe.nativeElement.onload = () => (this.isLoading = false);
  }
}
