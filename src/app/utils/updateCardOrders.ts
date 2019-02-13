import { Card, Plan, List } from '@app/models';
import { find, findIndex } from 'lodash';

export const updateCardOrderInListWithinPlans = (state, listId: number, cardId: number, index: number) =>
  state.plans.map((plan: Plan) => {
    const listToUpdate: List = find(plan.lists, list => list.id === listId);
    if (listToUpdate) {
      const currentIndex: number = findIndex(listToUpdate.cards, card => card.id === cardId);
      const card: Card = listToUpdate.cards[currentIndex];
      listToUpdate.cards.splice(currentIndex, 1);
      listToUpdate.cards.splice(index, 0, card);
      const i = findIndex(plan.lists, list => list.id === listId);
      plan.lists[i].cards = listToUpdate.cards;
    }
    return plan;
  });
