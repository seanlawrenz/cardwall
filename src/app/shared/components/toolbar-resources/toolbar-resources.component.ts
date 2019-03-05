import { Component, OnInit, Input } from '@angular/core';
import { Resources, Plan } from '@app/models';
import { ConfigService } from '@app/app-services';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'td-toolbar-resources',
  templateUrl: './toolbar-resources.component.html',
  styleUrls: ['./toolbar-resources.component.scss'],
})
export class ToolbarResourcesComponent implements OnInit {
  @Input() resource: Resources;

  profileUrl: SafeResourceUrl;
  reportUrl: SafeResourceUrl;

  totalCards = 0;
  totalStoryPoints = 0;
  totalEstimatedHours = 0;

  canViewReport = false;
  isSelected = false;
  isHighlighted = false;

  constructor(private config: ConfigService, private sanitizer: DomSanitizer) {}

  ngOnInit() {
    // Grab the analysis perm from the config setting
    this.canViewReport = this.config.config.HasAnalysis;

    // Set URLs relative to the base path, ensuring that things are properly encoded
    const base: string = this.config.config.TDNextBasePath;
    this.profileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`${base}Apps/People/PersonDet.aspx?U=${this.resource.uid}`);
    this.reportUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      `${base}Apps/Analysis/RptSchedule.aspx?UID=${this.resource.uid}&UIDName=${this.resource.name}&AutoRun=1`,
    );
  }
}
