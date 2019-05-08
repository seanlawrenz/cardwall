import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, HostListener, ChangeDetectorRef } from '@angular/core';
import { Card } from '@app/models';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { ConfigService } from '@app/app-services';

@Component({
  selector: 'td-add-issue',
  templateUrl: './add-issue.component.html',
  styleUrls: ['./add-issue.component.scss'],
})
export class AddIssueComponent implements OnInit {
  @Input() card: Card;

  @Output() closeAddIssueRequested = new EventEmitter<boolean>();

  @ViewChild('iframe') iframe: ElementRef;
  @ViewChild('addIssue') addIssue: ElementRef;

  addIssueUrl: SafeResourceUrl;
  loading = true;

  @HostListener('window:on-issue-new-hide', ['$event'])
  onCloseAddIssue(event: CustomEvent) {
    if (event && event.detail) {
      this.closeAddIssueRequested.emit(event.detail);
    }
  }

  constructor(private sanitizer: DomSanitizer, private config: ConfigService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.addIssueUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      `${this.config.config.TDNextBasePath}Apps/Projects/Issues/New.aspx?TID=${this.card.projectId}&Item=${this.card.planId}&ItemT=${
        this.card.id
      }&SA=1&CardWall=1`,
    );
    this.iframe.nativeElement.onload = () => {
      this.loading = false;
      this.cdr.markForCheck();
    };
  }

  closeAddIssue(saved: boolean) {
    this.closeAddIssueRequested.emit(saved);
  }
}
