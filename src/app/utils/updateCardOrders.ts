import { Card, Plan, List } from '@app/models';
import { find, findIndex } from 'lodash';

function insertItem(array, action) {
  const newArray = array.slice();
  newArray.splice(action.index, 0, action.item);
  return newArray;
}

function removeItem(array, index) {
  const newArray = array.slice();
  newArray.splice(index, 1);
  return newArray;
}

// export const updateCardOrderInListWithinPlans = (state, listId: number, cardId: number, index: number) =>
//   state.plans.map((plan: Plan) => {
//     const listToUpdate: List = find(plan.lists, list => list.id === listId);
//     if (listToUpdate) {
//       const currentIndex: number = findIndex(listToUpdate.cards, card => card.id === cardId);
//       if (currentIndex > -1) {
//         const card: Card = listToUpdate.cards[currentIndex];
//         listToUpdate.cards.splice(currentIndex, 1);
//         listToUpdate.cards.splice(index, 0, card);
//         const i = findIndex(plan.lists, list => list.id === listId);
//         plan.lists[i].cards = listToUpdate.cards;
//       }
//     }
//     return plan;
//   });

export const backlogCardReorder = (plans: Plan[], listId: number, cardId: number, index: number): Plan[] =>
  plans.map(plan => {
    const listToUpdate = findListById(plan, listId);
    if (listToUpdate) {
      listToUpdate.cards = cardReorder(listToUpdate.cards, cardId, index);
    }
    return plan;
  });

const cardReorder = (cards: Card[], cardIdToUpdate: number, index: number): Card[] => {
  const updateCard = find(cards, cardToUpdate => cardToUpdate.id === cardIdToUpdate);
  return insertItem(removeItem(cards, findIndex(cards, card => card.id === cardIdToUpdate)), { index, item: updateCard });
};

// export const updateCardFromListInPlans = (plans: Plan[])

export const removeCardFromListInPlans = (plans: Plan[], listToRemoveFromId: number, cardIdToRemove: number): Plan[] => {
  return plans.map(plan => {
    const list = findListById(plan, listToRemoveFromId);
    if (list) {
      list.cards = removeCardFromList(plan, listToRemoveFromId, cardIdToRemove);
    }
    return plan;
  });
};

const removeCardFromList = (plan: Plan, listToRemoveFromId: number, cardIdToRemove: number): Card[] => {
  const list = Object.assign({}, findListById(plan, listToRemoveFromId));
  const index = findIndex(list.cards, card => card.id === cardIdToRemove);
  return removeItem(list.cards, { index });
};

const findPlanById = (plans: Plan[], id: number): Plan => find(plans, plan => plan.id === id);
const findListById = (plan: Plan, id: number): List => find(plan.lists, list => list.id === id);

// export const addCardToList = (state, card: Card) => {
//   const listToUpdate = findListById(findPlanById(state.plans, card.planId), card.listId);
//   listToUpdate.cards.push(card);
//   return state.plans;
// };

// export const onCardUpated =

// export const removeCardOn
