import { Card } from '@app/models';

export const getRelativeMoveCardId = (cards: Card[], dragCard: Card, newIndex: number): number => {
  if (!cards || !dragCard || newIndex === undefined) {
    return 0;
  }
  let relativeCard: Card;
  const cardsWithoutDragCard = cards.filter(card => card.id !== dragCard.id);

  if (cardsWithoutDragCard.length === 0 || newIndex === 0) {
    // Only card in list
    return 0;
  } else if (newIndex >= cardsWithoutDragCard.length) {
    // At the bottom
    relativeCard = cardsWithoutDragCard[cardsWithoutDragCard.length - 1];
  } else {
    relativeCard = cardsWithoutDragCard[newIndex - 1];
  }

  return relativeCard.id;
};
