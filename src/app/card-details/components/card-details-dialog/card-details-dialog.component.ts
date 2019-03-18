import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'td-card-details-dialog',
  templateUrl: './card-details-dialog.component.html',
  styleUrls: ['./card-details-dialog.component.scss'],
})
export class CardDetailsDialogComponent implements OnInit {
  @Input() show: boolean;
  constructor() {}

  ngOnInit() {}
}
