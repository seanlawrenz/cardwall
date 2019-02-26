import { Card, Plan, CardOperationInfo, CardOrderInfo } from '@app/models';
import { find, findIndex, sortBy } from 'lodash';

/**
 * The server return a bunch of different data depending on the action.
 * These update the plan based on the data returned from the server
 */

// Generic insert function
function insertItem(array, action) {
  const newArray = array.slice();
  newArray.splice(action.index, 0, action.item);
  return newArray;
}

// Generic remove function
function removeItem(array, index) {
  const newArray = array.slice();
  if (index >= 0) {
    newArray.splice(index, 1);
  }
  return newArray;
}

export const updateCardOrderInListInBacklog = (plans: Plan[], listId: number, cardId: number, index: number): Plan[] => {
  return plans.map(plan => {
    const listToUpdate = find(plan.lists, list => list.id === listId);
    if (listToUpdate) {
      const currentIndex = findIndex(listToUpdate.cards, cardInList => cardInList.id === cardId);
      if (currentIndex === -1) {
        listToUpdate.cards = insertItem(listToUpdate.cards, {
          index: listToUpdate.cards.length + 1,
          item: findCardInPlanAndRemoveFromOldList(plan, cardId),
        });
      }
      listToUpdate.cards = updateCardOrderInList(listToUpdate.cards, cardId, index);
    }
    return plan;
  });
};

export const updateCardInBacklog = (plans: Plan[], updatedCard: Card): Plan[] => {
  if (!updatedCard) {
    return plans;
  }
  const { planId, listId } = updatedCard;
  return plans.map(plan => {
    if (plan.id === planId) {
      plan.lists.map(list => {
        if (list.id === listId) {
          list.cards = updateCardInList(list.cards, updatedCard);
        }
      });
    }
    return plan;
  });
};

export const createCardInBacklog = (plans: Plan[], info: CardOperationInfo): Plan[] => {
  if (!info) {
    return plans;
  }
  return plans.map(plan => {
    const { card } = info;
    if (plan.id === card.planId) {
      plan.lists.map(list => {
        if (list.id === card.listId) {
          list.cards = addCardAndUpdateOrder(list.cards, info);
        }
      });
    }
    return plan;
  });
};

export const deleteCardInBacklog = (plans: Plan[], cardToDelete: Card): Plan[] => {
  if (!cardToDelete) {
    return plans;
  }

  return plans.map(plan => {
    if (plan.id === cardToDelete.planId) {
      plan.lists.map(list => {
        if (list.id === cardToDelete.listId) {
          list.cards = removeCardFromList(list.cards, cardToDelete.id);
        }
      });
    }
    return plan;
  });
};

const findCardInPlanAndRemoveFromOldList = (plan: Plan, cardId: number): Card => {
  let targetCard: Card;
  plan.lists.map(list => {
    const card = find(list.cards, cardInList => cardInList.id === cardId);
    if (card) {
      targetCard = card;
      list.cards = removeCardFromList(list.cards, card.id);
    }
  });
  return targetCard;
};

const addCardAndUpdateOrder = (cards: Card[], info: CardOperationInfo): Card[] => {
  return updateCardOrder([...cards, info.card], info.orders);
};

const updateCardOrder = (cards: Card[], orders: CardOrderInfo[]): Card[] =>
  sortBy(
    cards.map(card => {
      const index = findIndex(orders, order => order.cardID === card.id);
      card.order = index > -1 ? orders[index].order : 0;
      return card;
    }),
    card => card.order,
  );

const removeCardFromList = (cards: Card[], cardIdToRemove: number): Card[] => {
  const currentIndex = findIndex(cards, card => card.id === cardIdToRemove);
  return removeItem(cards, currentIndex);
};

const updateCardOrderInList = (cards: Card[], cardIdToUpdate: number, index: number): Card[] => {
  const currentIndex = findIndex(cards, card => card.id === cardIdToUpdate);
  if (currentIndex > -1) {
    cards = insertItem(removeItem(cards, currentIndex), { index, item: cards[currentIndex] }).slice();
  }
  return cards;
};

const updateCardInList = (cards: Card[], updatedCard: Card): Card[] =>
  cards.map(card => (card.id === updatedCard.id ? { ...card, ...updatedCard } : card));
