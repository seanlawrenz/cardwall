import { Component, OnInit, Input } from '@angular/core';
import { PlanIdentifier } from '@app/models';

@Component({
  selector: 'td-add-board-diagram',
  templateUrl: './add-board-diagram.component.html',
  styleUrls: ['./add-board-diagram.component.scss'],
})
export class AddBoardDiagramComponent implements OnInit {
  @Input() planIdentifiers: PlanIdentifier[];
  constructor() {}

  ngOnInit() {}
}
