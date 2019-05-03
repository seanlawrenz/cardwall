import { Component, OnInit, Input, HostListener } from '@angular/core';
import { Card } from '@app/models';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { ConfigService } from '@app/app-services';

@Component({
  selector: 'td-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss'],
})
export class WorkComponent implements OnInit {
  @Input() card: Card;

  workUrl: SafeResourceUrl;
  isLoading = true;

  constructor(private sanitizer: DomSanitizer, private config: ConfigService) {}

  ngOnInit() {
    this.workUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      `http://192.168.1.14/${this.config.config.TaskWorkBasePath}?TID=${this.card.projectId}&Item=${this.card.planId}&ItemT=${
        this.card.id
      }&SA=1&CardWall=1&ShowHeader=0`,
    );
  }

  @HostListener('window:on-new-work-loaded', ['$event'])
  onNewWorkLoad() {
    // Set timeout so the content on the hosted page has time to resize properly
    setTimeout(() => {
      this.isLoading = false;
    }, 250);
  }
}
