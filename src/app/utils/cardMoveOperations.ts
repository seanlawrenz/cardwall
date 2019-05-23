import { Card, Plan, CardOperationInfo, CardOrderInfo, List, CardReorder } from '@app/models';
import { find, findIndex, sortBy } from 'lodash';

/**
 * The server return a bunch of different data depending on the action.
 * These update the plan based on the data returned from the server
 */

// Generic insert function
export function insertItem(array, action) {
  const newArray = array.slice();
  newArray.splice(action.index, 0, action.item);
  return newArray;
}

// Generic remove function
export function removeItem(array, index) {
  const newArray = array.slice();
  if (index >= 0) {
    newArray.splice(index, 1);
  }
  return newArray;
}

export const moveItemInArray = (arr, from, to) => {
  const clone = [...arr];
  clone.splice(to, 0, clone.splice(from, 1)[0]);
  return clone;
};

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

// Removes the card from the list it was on.
export const archiveCardOnBacklog = (plans: Plan[], cardToArchive: Card): Plan[] => {
  return plans.map(plan => {
    if (plan.id === cardToArchive.planId) {
      plan.lists = plan.lists.map(list => {
        if (list.id === 0) {
          list.cards = insertItem(list.cards, { index: list.cards.length + 1, item: cardToArchive });
        } else if (list.id === cardToArchive.listId) {
          list.cards = removeCardFromList(list.cards, cardToArchive.id);
        }
        return list;
      });
    }
    return plan;
  });
};

export const moveCardToTopOrBottomOfBacklog = (plansOnBacklog: Plan[], newList: List, cardToBeMoved: Card, top: boolean): Plan[] => {
  const planIndex: number = top === true ? 0 : plansOnBacklog.length - 1;
  // Ensure immutability
  const plans: Plan[] = [...plansOnBacklog];
  const listIndex = plans[planIndex].lists.findIndex(list => list.id === newList.id);
  const list: List = { ...newList };

  // Move Card
  findCardInPlanAndRemoveFromOldList(find(plans, plan => plan.id === cardToBeMoved.planId), cardToBeMoved.id);
  list.cards.push(cardToBeMoved);
  if (top) {
    list.cards = moveItemInArray(list.cards, list.cards.length - 1, 0);
  }
  cardToBeMoved.listId = list.id;
  plans[planIndex].lists[listIndex].cards = list.cards;
  return plans;
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

export const cardwallListReorder = (lists: List[], info: CardReorder): List[] => {
  const listToUpdate = find(lists, l => l.id === info.listId);
  if (listToUpdate) {
    const listToUpdateIndex: number = findIndex(lists, l => l.id === listToUpdate.id);
    if (listToUpdate.cards.findIndex(card => card.id === info.cardId) > -1) {
      listToUpdate.cards = updateCardOrderInList(listToUpdate.cards, info.cardId, info.index);
      return insertItem(removeItem(lists, listToUpdateIndex), { index: listToUpdateIndex, item: listToUpdate });
    } else {
      // Card may have been moved to new list
      let cardToUpdate: Card;
      for (let i = 0; i < lists.length; i++) {
        const cardIndex = lists[i].cards.findIndex(card => card.id === info.cardId);
        if (cardIndex > -1) {
          cardToUpdate = lists[i].cards[cardIndex];
          lists[i].cards = removeItem(lists[i].cards, cardIndex);
          break;
        }
      }
      listToUpdate.cards = insertItem(listToUpdate.cards, { index: info.index, item: cardToUpdate });
      return insertItem(removeItem(lists, listToUpdateIndex), { index: listToUpdateIndex, item: listToUpdate });
    }
  } else {
    return lists;
  }
};

export const updateCardInCardwall = (lists: List[], cardToUpdate: Card): List[] => {
  const listToUpdateIndex: number = findIndex(lists, l => l.id === cardToUpdate.listId);
  // Short cut if not in state
  if (listToUpdateIndex === -1) {
    return lists;
  }

  const index = findIndex(lists[listToUpdateIndex].cards, c => c.id === cardToUpdate.id);
  if (index > -1) {
    const listToUpdate = { ...lists[listToUpdateIndex], cards: updateCardInList(lists[listToUpdateIndex].cards, cardToUpdate) };
    return insertItem(removeItem(lists, listToUpdateIndex), { index: listToUpdateIndex, item: listToUpdate });
  } else {
    // May be moved to a new card
    return lists.map(l => {
      if (l.cards.findIndex(card => card.id === cardToUpdate.id) > -1) {
        l.cards = updateCardInList(l.cards, cardToUpdate);
      }
      return l;
    });
  }
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
  if (currentIndex > -1) {
    return removeItem(cards, currentIndex);
  } else {
    return cards;
  }
};

const updateCardOrderInList = (cards: Card[], cardIdToUpdate: number, index: number): Card[] => {
  const currentIndex = findIndex(cards, card => (card ? card.id === cardIdToUpdate : false));
  if (currentIndex > -1) {
    cards = insertItem(removeItem(cards, currentIndex), { index, item: cards[currentIndex] }).slice();
  }
  return cards;
};

const updateCardInList = (cards: Card[], updatedCard: Card): Card[] =>
  cards.map(card => (card.id === updatedCard.id ? { ...card, ...updatedCard } : card));
