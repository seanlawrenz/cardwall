import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'td-backlog-nav',
  templateUrl: './backlog-nav.component.html',
  styleUrls: ['./backlog-nav.component.scss'],
})
export class BacklogNavComponent implements OnInit {
  @Output() showOptions = new EventEmitter<void>();
  constructor() {}

  ngOnInit() {}

  navHamburgerClicked() {
    this.showOptions.emit();
  }
}
