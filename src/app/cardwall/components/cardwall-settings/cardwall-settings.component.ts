import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'td-cardwall-settings',
  templateUrl: './cardwall-settings.component.html',
  styleUrls: ['./cardwall-settings.component.scss'],
})
export class CardwallSettingsComponent implements OnInit {
  @Output() closeOptionsRequested = new EventEmitter<void>();

  constructor() {}

  ngOnInit() {}

  closeOptions() {
    this.closeOptionsRequested.emit();
  }
}
