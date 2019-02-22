import { Plan, ListReorderInfo, List } from '@app/models';
import { sortBy } from 'lodash';

export const updateListOrderInBacklog = (plans: Plan[], reorder: ListReorderInfo): Plan[] => {
  if (!reorder) {
    return plans;
  }

  return plans.map(plan => {
    if (plan.id === reorder.planID) {
      plan.lists = updateListOrder(plan.lists, reorder.sortedListIDs);
    }

    return plan;
  });
};

export const updateListOrder = (lists, sortedListIDs): List[] => {
  return sortBy(lists, list => {
    return sortedListIDs.indexOf(list.id);
  });
};
