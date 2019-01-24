import { Component, OnInit } from '@angular/core';

import { SignalRService } from './app-services';

import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [SignalRService],
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(private signalRService: SignalRService) {}

  ngOnInit() {
    this.signalRService.initialize().subscribe(() => {
      console.log('signalR logged in');
    });
  }
}
