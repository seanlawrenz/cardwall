import { Component, OnInit, Input, ViewChild, ElementRef, ChangeDetectorRef, Output, EventEmitter, HostListener } from '@angular/core';
import { Card } from '@app/models';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ConfigService } from '@app/app-services';

@Component({
  selector: 'td-add-attachment-base',
  templateUrl: './add-attachment-base.component.html',
  styleUrls: ['./add-attachment-base.component.scss'],
})
export class AddAttachmentBaseComponent implements OnInit {
  @Input() card: Card;

  @Output() closeAddAttachment = new EventEmitter<void>();

  @ViewChild('iframe') iframe: ElementRef;
  @ViewChild('addAttachments') addAttachments: ElementRef;

  addAttachmentUrl: SafeResourceUrl;
  loading = true;

  @HostListener('window:on-attachment-new-hide', ['$event'])
  onCloseAddAttachment(event: CustomEvent) {
    // TODO check this event
    if (event && event.detail) {
      console.log(event.detail);
      this.closeAddAttachment.emit();
    }
  }
  constructor(private sanitizer: DomSanitizer, private config: ConfigService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.addAttachmentUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      `${this.config.config.TDNextBasePath}Apps/Projects/Tasks/AddAttachmentInitial.aspx?ItemT=${this.card.id}&TID=${
        this.card.projectId
      }&CardWall=1`,
    );

    this.iframe.nativeElement.onload = () => {
      this.loading = false;
      this.addAttachments.nativeElement.focus();
      this.cdr.markForCheck();
    };
  }
}
