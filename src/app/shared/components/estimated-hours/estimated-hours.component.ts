import { Component, OnInit, Input } from '@angular/core';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'td-estimated-hours',
  templateUrl: './estimated-hours.component.html',
  styleUrls: ['./estimated-hours.component.scss'],
})
export class EstimatedHoursComponent implements OnInit {
  @Input() value = 0;

  ngOnInit() {}

  buildTooltip(): string {
    if (isNullOrUndefined(this.value)) {
      return `0.00 Estimated Hours`;
    } else if (this.value === 1) {
      return `1.00 Estimated Hour`;
    } else {
      return `${this.value.toFixed(2)} Estimated Hours`;
    }
  }
}
