import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'td-cardwall-settings',
  templateUrl: './cardwall-settings.component.html',
  styleUrls: ['./cardwall-settings.component.scss'],
})
export class CardwallSettingsComponent implements OnInit {
  @Input() showInactiveLists: boolean;

  @Output() showInactiveListsRequested: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output() closeOptionsRequested = new EventEmitter<void>();

  constructor() {}

  ngOnInit() {}

  closeOptions() {
    this.closeOptionsRequested.emit();
  }

  changeInShowInactiveLists(checked: boolean) {
    this.showInactiveListsRequested.emit(checked);
  }
}
