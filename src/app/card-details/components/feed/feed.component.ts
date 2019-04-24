import { Component, OnInit, Input } from '@angular/core';
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

  feedUrl: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer, private config: ConfigService) {}

  ngOnInit() {
    this.feedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      `${this.config.config.TDNextBasePath}Apps/Projects/Feed.aspx?TID=${this.card.projectId}&PlanID=${this.card.planId}&TaskID=${
        this.card.id
      }&HideNavigation=True&CardWall=1`,
    );
  }
}
