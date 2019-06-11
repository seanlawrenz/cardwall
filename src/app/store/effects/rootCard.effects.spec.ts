import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { TestActions, getActions } from '@app/test/mocks';
import { CardEffects } from './card.effects';
import { SignalRService } from '@app/app-services';

import * as cardActions from '../actions';
import { mockCard, mockBoard, mockList } from '@app/test/data';
import { cold, hot } from 'jasmine-marbles';
import { SignalRResult } from '@app/models';

describe('CardEffects', () => {
  let actions: TestActions;
  let effects: CardEffects;
  let action;
  let outcome;
  let response;
  let expected;
  let signalR: SignalRService;
  let signalRResult: SignalRResult;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CardEffects, { provide: Actions, useFactory: getActions }, { provide: SignalRService, useValue: { invoke: jest.fn() } }],
    });
  });

  it('should be created', () => {
    effects = TestBed.get(CardEffects);
    expect(effects).toBeTruthy();
  });

  describe('archiveCard', () => {
    beforeEach(() => {
      actions = TestBed.get(Actions);
      signalR = TestBed.get(SignalRService);
    });

    it('should return an observable of ArchiveCardSuccess with the original card that was archived', () => {
      mockBoard.lists = [{ ...mockList, id: 0 }];
      const originalMockCard = { ...mockCard };
      action = new cardActions.ArchiveCard({ card: mockCard, plan: mockBoard });
      outcome = new cardActions.ArchiveCardSuccess(originalMockCard);
      signalRResult = { isSuccessful: true, item: false };

      actions.stream = hot('-a', { a: action });
      response = cold('-a|', { a: signalRResult });
      expected = cold('--b', { b: outcome });
      signalR.invoke = jest.fn(() => response);

      effects = TestBed.get(CardEffects);

      expect(effects.archiveCard$).toBeObservable(expected);
    });
  });

  describe('deleteCard', () => {
    beforeEach(() => {
      actions = TestBed.get(Actions);
      signalR = TestBed.get(SignalRService);
    });

    it('should return an observable of DeleteCardSuccess with the original card that was deleted', () => {
      action = new cardActions.DeleteCard(mockCard);
      outcome = new cardActions.DeleteCardSuccess(mockCard);
      signalRResult = { isSuccessful: true, item: false };

      actions.stream = hot('-a', { a: action });
      response = cold('-a|', { a: signalRResult });
      expected = cold('--b', { b: outcome });
      signalR.invoke = jest.fn(() => response);

      effects = TestBed.get(CardEffects);

      expect(effects.deleteCard$).toBeObservable(expected);
    });
  });
});
