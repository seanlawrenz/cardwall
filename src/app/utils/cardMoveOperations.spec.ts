import {
  updateCardOrderInListInBacklog,
  updateCardInBacklog,
  createCardInBacklog,
  moveItemInArray,
  updateCardInCardwall,
  cardwallListReorder,
  createCardInCardwall,
} from './cardMoveOperations';

import { List, Plan, Card, CardOperationInfo } from '@app/models';
import { mockBoardBuilder, mockListBuilder, mockCardBuilder, mockList, mockCard } from '@app/test/data';

let plans: Plan[];
const mockPlan: Plan = mockBoardBuilder();
const mockPlan2: Plan = mockBoardBuilder();
const mockPlan3: Plan = mockBoardBuilder();
const mockListsFromPlan1: List = mockListBuilder();
const mockListsFromPlan2: List = mockListBuilder();
const mockListsFromPlan3: List = mockListBuilder();
mockListsFromPlan1.planId = mockPlan.id;
mockListsFromPlan2.planId = mockPlan.id;
mockListsFromPlan3.planId = mockPlan.id;
const mockCard1: Card = mockCardBuilder();
const mockCard2: Card = mockCardBuilder();
const mockCard3: Card = mockCardBuilder();
const mockCard4: Card = mockCardBuilder();
mockCard1.planId = mockPlan.id;
mockCard2.planId = mockPlan.id;
mockCard3.planId = mockPlan.id;
mockCard4.planId = mockPlan.id;
mockCard1.listId = mockListsFromPlan1.id;
mockCard2.listId = mockListsFromPlan1.id;
mockCard3.listId = mockListsFromPlan1.id;
mockCard4.listId = mockListsFromPlan1.id;

describe('updateCardFromListInBacklog', () => {
  it('should return plans', () => {
    plans = updateCardOrderInListInBacklog([mockPlan, mockPlan2, mockPlan3], undefined, undefined, undefined);
    expect(plans).toEqual(plans);
  });

  it('should update the card order of a list', () => {
    mockPlan.lists = [mockListsFromPlan1, mockListsFromPlan2];
    mockListsFromPlan1.cards = [mockCard2, mockCard1];
    // const listWithNewCard = { ...mockListsFromPlan1, cards: [mockCard1, mockCard2] };
    plans = updateCardOrderInListInBacklog([mockPlan, mockPlan2], mockListsFromPlan1.id, mockCard1.id, 0);
    expect(mockPlan.lists[0].cards).toEqual([mockCard1, mockCard2]);
  });

  it('should add a card that is not currently on the list to the list', () => {
    mockListsFromPlan1.cards = [mockCard2];
    mockListsFromPlan2.cards = [mockCard1];
    mockPlan.lists = [mockListsFromPlan1, mockListsFromPlan2];
    plans = updateCardOrderInListInBacklog([mockPlan, mockPlan2], mockListsFromPlan1.id, mockCard1.id, 1);
    expect(plans[0].lists[0].cards).toEqual([mockCard2, mockCard1]);
  });

  it('should remove the card from the old list', () => {
    mockListsFromPlan1.cards = [mockCard2];
    mockListsFromPlan2.cards = [mockCard1];
    mockPlan.lists = [mockListsFromPlan1, mockListsFromPlan2];
    plans = updateCardOrderInListInBacklog([mockPlan, mockPlan2], mockListsFromPlan1.id, mockCard1.id, 1);
    expect(plans[0].lists[1].cards).toEqual([]);
  });
});

describe('findCardInBacklogAndReplace', () => {
  it('should return plans', () => {
    plans = updateCardInBacklog([mockPlan, mockPlan2, mockPlan3], undefined);
    expect(plans).toEqual([mockPlan, mockPlan2, mockPlan3]);
  });

  it('should update a card within the plan', () => {
    mockCard1.planId = mockPlan.id;
    mockCard1.listId = mockListsFromPlan1.id;
    const updatedCard = { ...mockCard1, name: 'updated Via test' };
    mockListsFromPlan1.cards = [mockCard1, mockCard2];
    mockPlan.lists = [mockListsFromPlan1, mockListsFromPlan2];
    plans = updateCardInBacklog([mockPlan, mockPlan2], updatedCard);
    expect(mockListsFromPlan1.cards[0]).toEqual(updatedCard);
  });
});

describe('cardCreate', () => {
  it('should return plans', () => {
    plans = createCardInBacklog([mockPlan, mockPlan2], undefined);
    expect(plans).toEqual([mockPlan, mockPlan2]);
  });

  it('should add a card to the plan that it belongs to', () => {
    const newCard = { ...mockCard1, planId: mockPlan.id, listId: mockListsFromPlan1.id };
    const cardOperation: CardOperationInfo = { card: newCard, orders: [{ cardID: newCard.id, order: 1 }] };
    mockListsFromPlan1.cards = [];
    mockPlan.lists = [mockListsFromPlan1];

    plans = createCardInBacklog([mockPlan, mockPlan2], cardOperation);

    expect(plans[0].lists[0].cards).toEqual([newCard]);
  });
});

describe('moveItemInArray', () => {
  it('should move an item up', () => {
    const input = [1, 2, 3, 4, 5];
    const expected = [1, 3, 4, 2, 5];
    const action = moveItemInArray(input, 1, 3);
    expect(action).toEqual(expected);
  });

  it('should move an item down', () => {
    const input = [1, 2, 3, 4, 5];
    const expected = [1, 2, 4, 5, 3];
    const action = moveItemInArray(input, 2, input.length);
    expect(action).toEqual(expected);
  });
});

describe('updateCardInCardwall', () => {
  let expected;
  let test;
  it(`should not update the list's cards if the card has not moved`, () => {
    const cardToUpdate = { ...mockCard, listId: 1234 };
    const listThatHasTheCardCurrentlyInState = { ...mockList, id: 1234, cards: [cardToUpdate] };
    const listThatCardIsNotIn = { ...mockList, id: 123, cards: [] };
    const lists = [listThatHasTheCardCurrentlyInState, listThatCardIsNotIn];

    expected = [listThatHasTheCardCurrentlyInState, listThatCardIsNotIn];
    test = updateCardInCardwall(lists, cardToUpdate);

    expect(test).toEqual(expected);
    // Insure immutability
    expect(test).not.toBe(expected);
  });

  it('should update a card that is moving to a new list', () => {
    const cardToUpdate = { ...mockCard, listId: 123 };
    const listThatHasTheCardCurrentlyInState = { ...mockList, id: 1234, cards: [{ ...cardToUpdate, listId: 1234 }] };
    const listThatCardIsMovingTo = { ...mockList, id: 123, cards: [] };
    const lists = [listThatHasTheCardCurrentlyInState, listThatCardIsMovingTo];

    expected = [{ ...listThatHasTheCardCurrentlyInState, cards: [cardToUpdate] }, { ...listThatCardIsMovingTo, cards: [] }];

    test = updateCardInCardwall(lists, cardToUpdate);

    expect(test).toEqual(expected);
  });
});

describe('cardwallListReorder', () => {
  let expected;
  let test;

  it('should ignore bad data', () => {
    const cardToUpdate = { ...mockCard, listId: 12 };
    const listThatDoesNotMatchInfo = { ...mockList, id: 12, cards: [cardToUpdate] };

    expected = [listThatDoesNotMatchInfo];
    test = cardwallListReorder([listThatDoesNotMatchInfo], { listId: 0, cardId: cardToUpdate.id, index: 1 });

    expect(test).toEqual(expected);
  });

  it('should reorder a reorder within a list', () => {
    const cardToUpdate = { ...mockCard, listId: mockList.id };
    const cardAheadOfUpdatedCard = { ...mockCard, id: 12, listId: mockList.id };
    const listToUpdate = { ...mockList, cards: [cardAheadOfUpdatedCard, cardToUpdate] };
    const otherList = { ...mockList, cards: [], id: 123 };
    const lists = [otherList, listToUpdate];

    expected = [otherList, { ...listToUpdate, cards: [cardToUpdate, cardAheadOfUpdatedCard] }];
    test = cardwallListReorder(lists, { listId: listToUpdate.id, cardId: cardToUpdate.id, index: 0 });

    expect(test).toEqual(expected);
  });

  it('should reorder a card moving to a new list', () => {
    const cardToUpdate = { ...mockCard, listId: mockList.id };
    const cardThatWillBeBehindUpdatedCard = { ...mockCard, id: 12, listId: mockList.id };
    const listToUpdate = { ...mockList, cards: [cardThatWillBeBehindUpdatedCard] };
    const listCardIsMovingFrom = { ...mockList, cards: [cardToUpdate], id: 123 };
    const lists = [listCardIsMovingFrom, listToUpdate];

    expected = [{ ...listCardIsMovingFrom, cards: [] }, { ...listToUpdate, cards: [cardToUpdate, cardThatWillBeBehindUpdatedCard] }];
    test = cardwallListReorder(lists, { listId: listToUpdate.id, cardId: cardToUpdate.id, index: 0 });

    expect(test).toEqual(expected);
  });
});

describe('createCardInCardwall', () => {
  let expected;
  let test;

  it('should do nothing if list is the same', () => {
    const mockListWithNoChanges = { ...mockListsFromPlan1, cards: [mockCard1, mockCard2] };

    test = createCardInCardwall([mockListWithNoChanges], {
      card: mockCard1,
      orders: [{ cardID: mockCard1.id, order: 1 }, { cardID: mockCard2.id, order: 2 }],
    });
    expected = [mockListWithNoChanges];

    expect(test).toEqual(expected);
  });

  it('should add the card to the correct list', () => {
    const mockListWithNoChanges = { ...mockListsFromPlan1, cards: [mockCard1, mockCard2] };
    const cardOnTargetList = { ...mockCard3, listId: 123 };
    const targetList = { ...mockListsFromPlan1, id: 123, cards: [cardOnTargetList] };
    const newCardHeadingToNewList = { ...mockCard, listId: 123 };

    test = createCardInCardwall([mockListWithNoChanges, targetList], {
      card: newCardHeadingToNewList,
      orders: [{ cardID: cardOnTargetList.id, order: 1 }, { cardID: newCardHeadingToNewList.id, order: 2 }],
    });
    expected = [mockListWithNoChanges, { ...targetList, cards: [cardOnTargetList, newCardHeadingToNewList] }];

    expect(test).toEqual(expected);
  });
});
