import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'td-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  @Input() icon = '';
  @Input() disabled = false;
  @Input() tooltipText: string;
  @Input() tooltipPlacement = 'bottom';
  @Input() cssClass = 'btn-link';
  @Input() useWhiteText = false;
  @Input() ariaLabel: string;
  @Input() type = 'button';
  @Input() srOnly: string;

  @Output() onClick = new EventEmitter<any>();

  effectiveIcon = '';

  ngOnInit() {
    this.effectiveIcon = `fa fa-fw fa-${this.icon}`;
  }

  actionOnClick() {
    this.onClick.emit();
  }
}
