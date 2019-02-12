import { getRelativeMoveCardId } from './relativeMoveCardId';
import { Card } from '@app/models';
import { mockCardBuilder } from '@app/test/data';

describe('getRelativeMoveCardId', () => {
  let result;
  let mockCard: Card;
  let mockCard2: Card;
  let mockCard3: Card;
  let mockCard4: Card;
  let cards: Card[];
  it('should handle bad data', () => {
    result = getRelativeMoveCardId(undefined, undefined, undefined);
    expect(result).toBe(0);
  });

  it('should return null if moved to new list', () => {
    mockCard = mockCardBuilder();
    cards = [mockCard];
    result = getRelativeMoveCardId(cards, mockCard, 0);
    expect(result).toBe(0);
  });

  it('should return the second to last if moved to bottom of list', () => {
    mockCard = mockCardBuilder();
    mockCard2 = mockCardBuilder();
    mockCard3 = mockCardBuilder();
    mockCard4 = mockCardBuilder();
    cards = [mockCard2, mockCard3, mockCard4, mockCard];

    result = getRelativeMoveCardId(cards, mockCard, 3);

    expect(result).toBe(mockCard4.id);
  });

  it('should return the card before it in the list', () => {
    mockCard = mockCardBuilder();
    mockCard2 = mockCardBuilder();
    mockCard3 = mockCardBuilder();
    mockCard4 = mockCardBuilder();
    cards = [mockCard2, mockCard3, mockCard, mockCard4];

    result = getRelativeMoveCardId(cards, mockCard, 2);

    expect(result).toBe(mockCard3.id);
  });
});
