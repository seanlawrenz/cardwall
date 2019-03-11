import { updateCardOrderInListInBacklog, updateCardInBacklog, createCardInBacklog, moveItemInArray } from './cardMoveOperations';

import { List, Plan, Card, CardOperationInfo } from '@app/models';
import { mockBoardBuilder, mockListBuilder, mockCardBuilder, mockList } from '@app/test/data';

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
