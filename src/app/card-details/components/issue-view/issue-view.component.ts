import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

import { ConfigService } from '@app/app-services';

import { Issue, Card } from '@app/models';

@Component({
  selector: 'td-issue-view',
  templateUrl: './issue-view.component.html',
  styleUrls: ['./issue-view.component.scss'],
})
export class IssueViewComponent implements OnInit, OnChanges {
  @Input() issues: Issue[];
  @Input() card: Card;

  sortedIssues: Issue[];

  // Permissions
  canDelete: boolean;
  canAdd: boolean;

  constructor(private config: ConfigService) {}

  ngOnInit() {
    this.sortedIssues = [...this.issues];
    this.setPermissions();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.issues && !changes.issues.firstChange) {
      this.sortedIssues = [...changes.issues.currentValue];
    }
  }

  getIssueDetUrl(issueId: number): string {
    return `${this.config.config.TDNextBasePath}Apps/Projects/Issues/IssueDet.aspx?IID=${issueId}&TID=${this.card.projectId}`;
  }

  private setPermissions() {
    this.canAdd = this.config.config.CanAddIssues;
    this.canDelete = this.config.config.CanDeleteIssues;
  }
}
