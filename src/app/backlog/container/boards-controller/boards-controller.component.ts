import { Component, OnInit, Input } from '@angular/core';
import { Plan } from '@app/models';
import { SortablejsOptions } from 'angular-sortablejs';

@Component({
  selector: 'td-boards-controller',
  templateUrl: './boards-controller.component.html',
  styleUrls: ['./boards-controller.component.scss'],
})
export class BoardsControllerComponent implements OnInit {
  @Input() plans: Plan[];

  sortableOptions: SortablejsOptions = {
    group: 'backlogPlans',
    onEnd: () => this.sortPlans(),
  };

  ngOnInit() {}

  sortPlans() {}
}
