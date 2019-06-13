import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { Board } from '@app/models';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { ConfigService } from '@app/app-services';

@Component({
  selector: 'td-feed-toolbar',
  templateUrl: './feed-toolbar.component.html',
})
export class FeedToolbarComponent implements OnInit {
  @Input() board: Board;

  @Output() closeFeedRequested = new EventEmitter<void>();

  @ViewChild('iframe') iframe: ElementRef;

  feedUrl: SafeResourceUrl;
  loading = true;

  constructor(private sanitizer: DomSanitizer, private config: ConfigService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.feedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      `${this.config.config.TDNextBasePath}/Apps/Projects/Feed.aspx?TID=${this.board.projectId}&PlanID=${
        this.board.id
      }&HideNavigation=True&CardWall=1`,
    );

    this.iframe.nativeElement.onload = () => {
      this.loading = false;
      this.cdr.markForCheck();
    };
  }

  closePane() {
    this.closeFeedRequested.emit();
  }
}
