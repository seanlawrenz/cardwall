import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Plan } from '@app/models';

@Component({
  selector: 'td-backlog-nav',
  templateUrl: './backlog-nav.component.html',
  styleUrls: ['./backlog-nav.component.scss'],
})
export class BacklogNavComponent implements OnInit {
  @Input() plans: Plan[];
  @Output() showOptions = new EventEmitter<void>();
  constructor() {}

  ngOnInit() {}

  navHamburgerClicked() {
    this.showOptions.emit();
  }
}
