import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Attachment, ErrorFromSignalR, Card, SortCriteria } from '@app/models';
import { ConfigService } from '@app/app-services';

@Component({
  selector: 'td-attachments',
  templateUrl: './attachments.component.html',
  styleUrls: ['./attachments.component.scss'],
})
export class AttachmentsComponent implements OnInit, OnChanges {
  @Input() attachments: Attachment[];
  @Input() card: Card;
  @Input() error: ErrorFromSignalR;

  sortedAttachments: Attachment[];

  constructor(private config: ConfigService) {}

  ngOnInit() {
    this.sortedAttachments = [...this.attachments];
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.attachments && !changes.attachments.firstChange) {
      this.sortedAttachments = [...changes.attachments.currentValue];
    }
  }

  getAttachmentUrl(attachment: Attachment): string {
    return `${this.config.config.TDNextBasePath}Apps/Projects/BriefCase/FileDet.aspx?fid=${attachment.ID}&TID=${this.card.projectId}`;
  }

  getAttachmentDownloadUrl(attachment: Attachment): string {
    return `${this.config.config.TDNextBasePath}Apps/Projects/BriefCase/FileOpen.aspx?D=1&fid=${attachment.ID}&TID=${this.card.projectId}`;
  }

  onSorted($event: SortCriteria) {
    this.sortedAttachments = this.sortAttachments([...this.attachments], $event);
  }

  private sortAttachments(attachments: Attachment[], criteria: SortCriteria): Attachment[] {
    return attachments.sort((a, b) => {
      if (criteria.sortColumn === 'size') {
        if (criteria.sortDirection === 'desc') {
          return b.size - a.size;
        } else {
          return a.size - b.size;
        }
      } else {
        if (criteria.sortDirection === 'desc') {
          if (a[criteria.sortColumn].toLowerCase() < b[criteria.sortColumn].toLowerCase()) {
            return 1;
          }
          if (a[criteria.sortColumn].toLowerCase() > b[criteria.sortColumn].toLowerCase()) {
            return -1;
          }
          return 0;
        } else {
          if (a[criteria.sortColumn].toLowerCase() > b[criteria.sortColumn].toLowerCase()) {
            return 1;
          }
          if (a[criteria.sortColumn].toLowerCase() < b[criteria.sortColumn].toLowerCase()) {
            return -1;
          }
          return 0;
        }
      }
    });
  }
}
