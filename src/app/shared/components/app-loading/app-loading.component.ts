import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'td-app-loading',
  templateUrl: './app-loading.component.html',
  styleUrls: ['./app-loading.component.scss'],
})
export class AppLoadingComponent implements OnInit {
  @Input() display = 'Cardwall Manager';

  constructor() {}

  ngOnInit() {}
}
