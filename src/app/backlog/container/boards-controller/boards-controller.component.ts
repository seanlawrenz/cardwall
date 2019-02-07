import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { Plan } from '@app/models';
import { SortablejsOptions } from 'angular-sortablejs';

@Component({
  selector: 'td-boards-controller',
  templateUrl: './boards-controller.component.html',
  styleUrls: ['./boards-controller.component.scss'],
})
export class BoardsControllerComponent implements OnInit {
  @Input() plans: Plan[];

  constructor(private location: Location) {}

  sortableOptions: SortablejsOptions = {
    group: 'backlogPlans',
    onEnd: () => this.sortPlans(),
  };

  ngOnInit() {}

  sortPlans() {
    let url = 'backlog?boards=';

    this.plans.map(plan => {
      url += `${plan.projectId}_${plan.id},`;
    });
    url = url.slice(0, -1);
    this.location.go(url);
  }
}
