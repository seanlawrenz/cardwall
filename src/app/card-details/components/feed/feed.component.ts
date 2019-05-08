import { Component, OnInit, Input, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { Card } from '@app/models';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { ConfigService } from '@app/app-services';

@Component({
  selector: 'td-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent implements OnInit {
  @Input() card: Card;

  @ViewChild('iframe') iframe: ElementRef;

  feedUrl: SafeResourceUrl;
  loading = true;

  constructor(private sanitizer: DomSanitizer, private config: ConfigService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.feedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      `${this.config.config.TDNextBasePath}Apps/Projects/Feed.aspx?TID=${this.card.projectId}&PlanID=${this.card.planId}&TaskID=${
        this.card.id
      }&HideNavigation=True&CardWall=1`,
    );

    this.iframe.nativeElement.onload = () => {
      this.loading = false;
      this.cdr.markForCheck();
    };
  }
}
