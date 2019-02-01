import { Component, OnInit, Input } from '@angular/core';
import { Plan } from '@app/models';

@Component({
  selector: 'td-boards-view',
  templateUrl: './boards-view.component.html',
  styleUrls: ['./boards-view.component.scss'],
})
export class BoardsViewComponent implements OnInit {
  @Input() plans: Plan[];

  ngOnInit() {}
}
