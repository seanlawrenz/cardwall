import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PlanIdentifier } from '@app/models';

import { find } from 'lodash';

interface DisplayPlanIdentifier {
  plan: PlanIdentifier;
  isSelected: boolean;
}

@Component({
  selector: 'td-add-board-diagram',
  templateUrl: './add-board-diagram.component.html',
  styleUrls: ['./add-board-diagram.component.scss'],
})
export class AddBoardDiagramComponent implements OnInit {
  @Input() planIdentifiers: PlanIdentifier[];
  @Output() plansToAdd = new EventEmitter<PlanIdentifier[]>();
  selectedPlans: PlanIdentifier[] = [];
  plansToDisplay: DisplayPlanIdentifier[] = [];
  constructor() {}

  ngOnInit() {
    this.planIdentifiers.map((plan: PlanIdentifier) => {
      this.plansToDisplay.push({ plan, isSelected: false });
    });
  }

  updateSelectedPlans(selectedPlan: DisplayPlanIdentifier) {
    selectedPlan.isSelected = !selectedPlan.isSelected;
  }

  addCardwallsToBacklog() {
    const findPlan = (plan: PlanIdentifier, plans: PlanIdentifier[]) => find(plans, p => p.planID === plan.planID);
    const updatedSelected = this.plansToDisplay.map(async (planOnDocument: DisplayPlanIdentifier) => {
      if (planOnDocument.isSelected) {
        this.selectedPlans.push(findPlan(planOnDocument.plan, this.planIdentifiers));
      }
    });

    Promise.all(updatedSelected).then(() => {
      this.plansToAdd.emit(this.selectedPlans);
    });
  }
}
