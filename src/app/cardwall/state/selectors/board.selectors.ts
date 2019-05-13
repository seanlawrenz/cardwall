import { createSelector } from '@ngrx/store';
import * as fromCardwall from '../reducer';
import { getRouterState } from '@app/store/selectors';

export const getBoard = createSelector(
  fromCardwall.getCardwallState,
  state => state.board.board,
);

export const getSelectedCard = createSelector(
  getBoard,
  getRouterState,
  (board, router) => {
    const cardId = parseInt(router.state.params.cardId, 10);
    if (board) {
      let card;
      board.lists.map(list => {
        list.cards.map(c => {
          if (c.id === cardId) {
            card = c;
          }
        });
      });
      return { card, board };
    }
  },
);

export const getSelectedTab = createSelector(
  getSelectedCard,
  getRouterState,
  (selectedCardData, router) => {
    if (selectedCardData) {
      const { card, board } = selectedCardData;
      let tab: string = router.state.queryParams['tab'];
      if (!tab) {
        tab = 'form';
      }
      return { card, board, tab };
    }
  },
);
