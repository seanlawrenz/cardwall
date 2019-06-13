import { Component, OnInit, Output, EventEmitter, Input, ViewChild, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
import { Board, BrowserNotificationPreferences } from '@app/models';
import { ConfigService } from '@app/app-services';

@Component({
  selector: 'td-cardwall-settings',
  templateUrl: './cardwall-settings.component.html',
  styleUrls: ['./cardwall-settings.component.scss'],
})
export class CardwallSettingsComponent implements OnInit, OnChanges {
  @Input() showInactiveLists: boolean;
  @Input() showArchiveCards: boolean;
  @Input() notificationPreference: BrowserNotificationPreferences;
  @Input() board: Board;

  @Output() showInactiveListsRequested: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() showArchiveCardsRequested: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() changeInNotifyOptions = new EventEmitter<string>();
  @Output() closeOptionsRequested = new EventEmitter<void>();

  @ViewChild('none') none: ElementRef;
  @ViewChild('myItems') myItems: ElementRef;
  @ViewChild('allItems') allItems: ElementRef;

  planDetailsUrl: string;
  customViewUrl: string;
  priorityViewUrl: string;
  resourceAllocationUrl: string;
  burnDownUrl: string;

  constructor(private config: ConfigService) {}

  ngOnInit() {
    this.setupIframeUrls();
    this.selectNotifyRadio(this.notificationPreference);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.notificationPreference && !changes.notificationPreference.firstChange) {
      this.selectNotifyRadio(changes.notificationPreference.currentValue);
    }
  }

  closeOptions() {
    this.closeOptionsRequested.emit();
  }

  changeInShowInactiveLists(checked: boolean) {
    this.showInactiveListsRequested.emit(checked);
  }

  changeInShowArchiveCards(checked: boolean) {
    this.showArchiveCardsRequested.emit(checked);
  }

  setNotify(type: string) {
    this.changeInNotifyOptions.emit(type);
  }

  private setupIframeUrls() {
    const base = `${this.config.config.TDNextBasePath}Apps/Projects/Tasks/`;
    this.planDetailsUrl = `${base}PlanDetails.aspx?PID=${this.board.projectId}&PlanID=${this.board.id}&DraftID=0&SA=1&fromCardwall=1`;
    this.customViewUrl = `${base}TaskCustomView.aspx?PID=${this.board.projectId}&PlanID=${this.board.id}&DraftID=0&SA=1`;
    this.priorityViewUrl = `${base}PlanDetails.aspx?PID=${this.board.projectId}&PlanID=${this.board.id}&DraftID=0&SA=1&fromCardwall=1`;
    this.resourceAllocationUrl = `${base}TaskResourceAllocation.aspx?PID=${this.board.projectId}&PlanID=${this.board.id}&DraftID=0&SA=1`;
    this.burnDownUrl = `${base}PlanBurnDown.aspx?Item=${this.board.id}&TID=${this.board.projectId}&ShowViewMenu=false`;
  }

  private selectNotifyRadio(type: BrowserNotificationPreferences) {
    switch (type) {
      case BrowserNotificationPreferences.NONE:
        this.none.nativeElement.checked = true;
        break;

      case BrowserNotificationPreferences.MY_ITEMS:
        this.myItems.nativeElement.checked = true;
        break;

      case BrowserNotificationPreferences.ALL:
        this.allItems.nativeElement.checked = true;
        break;

      default:
        this.none.nativeElement.checked = true;
    }
  }
}
