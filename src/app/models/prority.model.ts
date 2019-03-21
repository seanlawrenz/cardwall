export class Priority {
  id: number;
  class: string;
  type: string;
}

export class PriorityClasses {
  priorityClasses: Priority[];

  constructor() {
    this.priorityClasses = [
      { id: 1, class: 'priority-high', type: 'High' },
      { id: 2, class: 'priority-med-high', type: 'Medium/High' },
      { id: 3, class: 'priority-med', type: 'Medium' },
      { id: 4, class: 'priority-med-low', type: 'Medium/Low' },
      { id: 5, class: 'priority-low', type: 'Low' },
    ];
  }
}
