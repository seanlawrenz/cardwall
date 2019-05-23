import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { TestActions, getActions } from '@app/test/mocks';
import { CardwallCardEffects } from './card.effects';
import { CardService, SignalRService } from '@app/app-services';

import * as cardwallActions from '../actions';
import { mockCard, mockList } from '@app/test/data';
import { cold, hot } from 'jasmine-marbles';

describe('CardwallCardEffects', () => {
  let actions: TestActions;
  let effects: CardwallCardEffects;
  let action;
  let outcome;
  let response;
  let expected;
  let store;
  let cardSvc: CardService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CardwallCardEffects,
        { provide: Actions, useFactory: getActions },
        { provide: CardService, useValue: { moveCardToListInSameBoard: jest.fn() } },
        { provide: SignalRService, useValue: jest.fn() },
        { provide: Store, useValue: { select: jest.fn() } },
      ],
    });
  });

  it('should be created', () => {
    effects = TestBed.get(CardwallCardEffects);
    expect(effects).toBeTruthy();
  });

  describe('moveCardToNewList$', () => {
    beforeEach(() => {
      actions = TestBed.get(Actions);
      store = TestBed.get(Store);
      cardSvc = TestBed.get(CardService);
    });

    it('should return an observable of CardMoveToNewListSuccess', () => {
      action = new cardwallActions.CardMoveToNewList({ card: { ...mockCard, listId: 123 }, listId: mockList.id, newIndex: 0 });
      outcome = new cardwallActions.CardMoveToNewListSuccess();

      store.select = jest.fn(() => cold('a', { a: [mockList, { ...mockList, id: 123 }] }));
      actions.stream = hot('-a', { a: action });
      response = cold('-a|', { a: {} });
      expected = cold('--b', { b: outcome });
      cardSvc.moveCardToListInSameBoard = jest.fn(() => response);

      effects = TestBed.get(CardwallCardEffects);

      expect(effects.moveCardToNewList$).toBeObservable(expected);
    });
  });
});
