import { Plan, ListReorderInfo, List } from '@app/models';
import { sortBy, findIndex } from 'lodash';
import { removeItem, insertItem } from './cardMoveOperations';

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

export const updateListInBoard = (lists: List[], updatedList: List): List[] => {
  const index: number = findIndex(lists, list => list.id === updatedList.id);
  if (index > -1) {
    return insertItem(removeItem(lists, index), { index, item: updatedList });
  } else {
    return lists;
  }
};
