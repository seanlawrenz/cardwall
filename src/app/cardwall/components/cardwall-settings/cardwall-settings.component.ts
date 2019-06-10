import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Board } from '@app/models';
import { ConfigService } from '@app/app-services';

@Component({
  selector: 'td-cardwall-settings',
  templateUrl: './cardwall-settings.component.html',
  styleUrls: ['./cardwall-settings.component.scss'],
})
export class CardwallSettingsComponent implements OnInit {
  @Input() showInactiveLists: boolean;
  @Input() showArchiveCards: boolean;
  @Input() board: Board;

  @Output() showInactiveListsRequested: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() showArchiveCardsRequested: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() closeOptionsRequested = new EventEmitter<void>();

  planDetailsUrl: string;
  customViewUrl: string;
  priorityViewUrl: string;
  resourceAllocationUrl: string;
  burnDownUrl: string;

  constructor(private config: ConfigService) {}

  ngOnInit() {
    this.setupIframeUrls();
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

  private setupIframeUrls() {
    const base = `${this.config.config.TDNextBasePath}Apps/Projects/Tasks/`;
    this.planDetailsUrl = `${base}PlanDetails.aspx?PID=${this.board.projectId}&PlanID=${this.board.id}&DraftID=0&SA=1&fromCardwall=1`;
    this.customViewUrl = `${base}TaskCustomView.aspx?PID=${this.board.projectId}&PlanID=${this.board.id}&DraftID=0&SA=1`;
    this.priorityViewUrl = `${base}PlanDetails.aspx?PID=${this.board.projectId}&PlanID=${this.board.id}&DraftID=0&SA=1&fromCardwall=1`;
    this.resourceAllocationUrl = `${base}TaskResourceAllocation.aspx?PID=${this.board.projectId}&PlanID=${this.board.id}&DraftID=0&SA=1`;
    this.burnDownUrl = `${base}PlanBurnDown.aspx?Item=${this.board.id}&TID=${this.board.projectId}&ShowViewMenu=false`;
  }
}
