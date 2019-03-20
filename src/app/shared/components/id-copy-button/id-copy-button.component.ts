import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NotificationService } from '@app/app-services/notification.service';
import { ClipboardService } from 'ngx-clipboard';

@Component({
  selector: 'td-id-copy-button',
  templateUrl: './id-copy-button.component.html',
  styleUrls: ['./id-copy-button.component.scss'],
})
export class IdCopyButtonComponent implements OnInit, OnDestroy {
  @Input() itemID: number;
  @Input() itemType: string;

  copyIDTooltip: string;
  copyIDValue: number;
  copyTypeAndIDTooltip: string;
  copyTypeAndIDValue: string;
  copyTypeAndIDButtonText: string;

  private clipboard;
  private failureCaption = 'Copy Error';
  private failureMessage = 'Could not copy to clipboard. Your browser may be denying access.';

  constructor(private notification: NotificationService, private clipboardService: ClipboardService) {}

  ngOnInit() {
    // Set values
    this.copyIDValue = this.itemID;
    this.copyTypeAndIDValue = `${this.itemType} #${this.itemID}`;

    // Set copyTypeAnd button's text
    this.copyTypeAndIDButtonText = `${this.itemType} ID:`;

    // Set tooltips
    this.copyIDTooltip = `Copy "${this.copyIDValue}" to clipboard`;
    this.copyTypeAndIDTooltip = `Copy "${this.copyTypeAndIDValue}" to clipboard`;
  }

  ngOnDestroy() {
    if (this.clipboard) {
      this.clipboard.destroy();
    }
  }

  copySuccess(e) {}

  copyFailure() {
    this.notification.danger(this.failureCaption, this.failureMessage);
  }
}
