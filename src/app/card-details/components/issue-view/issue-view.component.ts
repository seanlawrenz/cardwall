import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';

import { ConfigService, NotificationService } from '@app/app-services';

import { Issue, Card, ErrorFromSignalR, SortCriteria } from '@app/models';

@Component({
  selector: 'td-issue-view',
  templateUrl: './issue-view.component.html',
  styleUrls: ['./issue-view.component.scss'],
})
export class IssueViewComponent implements OnInit, OnChanges {
  @Input() issues: Issue[];
  @Input() card: Card;
  @Input() error: ErrorFromSignalR;

  @Output() addIssueRequested = new EventEmitter<void>();

  sortedIssues: Issue[];

  // Permissions
  canDelete: boolean;
  canAdd: boolean;

  constructor(private config: ConfigService, private notify: NotificationService) {}

  ngOnInit() {
    this.sortedIssues = [...this.issues];
    this.notifyOfError();
    this.setPermissions();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.issues && !changes.issues.firstChange) {
      this.sortedIssues = [...changes.issues.currentValue];
    }

    if (changes.error && !changes.error.firstChange) {
      this.notifyOfError();
    }
  }

  getIssueDetUrl(issueId: number): string {
    return `${this.config.config.TDNextBasePath}Apps/Projects/Issues/IssueDet.aspx?IID=${issueId}&TID=${this.card.projectId}`;
  }

  onSorted($event: SortCriteria) {
    this.sortedIssues = this.sortIssues([...this.issues], $event);
  }

  addIssue() {
    this.addIssueRequested.emit();
  }

  private setPermissions() {
    this.canAdd = this.config.config.CanAddIssues;
    this.canDelete = this.config.config.CanDeleteIssues;
  }

  private notifyOfError() {
    if (this.error) {
      this.notify.danger(this.error.message, this.error.reason);
    }
  }

  private sortIssues(issues: Issue[], criteria: SortCriteria): Issue[] {
    return issues.sort((a, b) => {
      if (criteria.sortColumn === 'id') {
        if (criteria.sortDirection === 'asc') {
          return a.ID - b.ID;
        } else {
          return b.ID - a.ID;
        }
      }
      if (criteria.sortColumn === 'responsible') {
        if (criteria.sortDirection === 'asc') {
          if (a.responsibleFullName.toLowerCase() > b.responsibleFullName.toLowerCase()) {
            return 1;
          }
          if (a.responsibleFullName.toLowerCase() < b.responsibleFullName.toLowerCase()) {
            return -1;
          }
          return 0;
        } else {
          if (a.responsibleFullName.toLowerCase() < b.responsibleFullName.toLowerCase()) {
            return 1;
          }
          if (a.responsibleFullName.toLowerCase() > b.responsibleFullName.toLowerCase()) {
            return -1;
          }
          return 0;
        }
      } else {
        if (criteria.sortDirection === 'asc') {
          if (a[criteria.sortColumn].toLowerCase() > b[criteria.sortColumn].toLowerCase()) {
            return 1;
          }
          if (a[criteria.sortColumn].toLowerCase() < b[criteria.sortColumn].toLowerCase()) {
            return -1;
          }
          return 0;
        } else {
          if (a[criteria.sortColumn].toLowerCase() < b[criteria.sortColumn].toLowerCase()) {
            return 1;
          }
          if (a[criteria.sortColumn].toLowerCase() > b[criteria.sortColumn].toLowerCase()) {
            return -1;
          }
          return 0;
        }
      }
    });
  }
}
