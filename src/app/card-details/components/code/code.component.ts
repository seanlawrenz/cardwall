import { Component, OnInit, Input, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { Card } from '@app/models';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { ConfigService } from '@app/app-services';

@Component({
  selector: 'td-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.scss'],
})
export class CodeComponent implements OnInit {
  @Input() card: Card;

  @ViewChild('iframe') iframe: ElementRef;

  codeUrl: SafeResourceUrl;
  loading = true;

  constructor(private sanitizer: DomSanitizer, private config: ConfigService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.codeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      `${this.config.config.TDNextBasePath}Apps/Projects/Tasks/TaskCode?projectId=${this.card.projectId}&planId=${
        this.card.planId
      }&taskId=${this.card.id}&forCardwall=True`,
    );

    this.iframe.nativeElement.onload = () => {
      this.loading = false;
      this.cdr.markForCheck();
    };
  }
}
