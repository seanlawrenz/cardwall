import { Component, OnInit, OnChanges, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'td-backlog-settings',
  templateUrl: './backlog-settings.component.html',
  styleUrls: ['./backlog-settings.component.scss'],
})
export class BacklogSettingsComponent implements OnInit, OnChanges {
  @Input() showWIP: boolean;
  @Input() showStoryPoints: boolean;
  @Input() showEstimatedHours: boolean;
  @Output() settingsUpdated = new EventEmitter<{ type: string; selected?: boolean }>();

  @ViewChild('all') allRef: ElementRef;
  @ViewChild('storyPoints') storyPointsRef: ElementRef;
  @ViewChild('estimatedHours') estimatedHoursRef: ElementRef;
  @ViewChild('none') noneRef: ElementRef;

  constructor() {}

  ngOnInit() {
    this.selectRadio();
  }

  ngOnChanges() {
    this.selectRadio();
  }

  selectRadio() {
    if (this.showEstimatedHours && this.showStoryPoints) {
      this.allRef.nativeElement.checked = true;
    } else if (this.showEstimatedHours) {
      this.estimatedHoursRef.nativeElement.checked = true;
    } else if (this.showStoryPoints) {
      this.storyPointsRef.nativeElement.checked = true;
    } else {
      this.noneRef.nativeElement.checked = true;
    }
  }

  updateSetting(type: string, selected?: boolean) {
    this.settingsUpdated.emit({ type, selected });
  }
}
