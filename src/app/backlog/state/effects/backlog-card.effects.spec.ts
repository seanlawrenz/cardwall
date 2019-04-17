import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { SignalRResult } from '@app/models';
import { hot, cold } from 'jasmine-marbles';

import { SignalRService } from '@app/app-services';
import { BacklogCardEffects } from './backlog-card.effects';
import { TestActions, getActions } from '@app/test/mocks';

import * as backlogActions from '@app/backlog/state/actions';
import { mockCard } from '@app/test/data';

describe('BacklogCardEffects', () => {
  let actions: TestActions;
  let effects: BacklogCardEffects;
  let signalR: SignalRService;
  let action;
  let outcome;
  let response;
  let expected;
  let signalRResult: SignalRResult;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BacklogCardEffects,
        { provide: Actions, useFactory: getActions },
        { provide: SignalRService, useValue: { invoke: jest.fn() } },
        { provide: Store, useValue: { dispatch: jest.fn(), select: jest.fn() } },
      ],
    });
  });

  it('should be created', () => {
    effects = TestBed.get(BacklogCardEffects);
  });

  describe('archiveCardOnBacklog', () => {
    beforeEach(() => {
      actions = TestBed.get(Actions);
      signalR = TestBed.get(SignalRService);
    });

    it('should return an observable of ArchiveCardSuccess', () => {
      signalRResult = {
        isSuccessful: true,
        item: false,
      };
      const mockArchiveCard = { ...mockCard, listId: 0 };
      action = new backlogActions.ArchiveCard({ card: mockArchiveCard, useRemainingHours: false, originalCard: mockCard });
      outcome = new backlogActions.ArchiveCardSuccess(mockCard);
      actions.stream = hot('-a', { a: action });
      response = cold('-a|', { a: signalRResult });
      expected = cold('--b', { b: outcome });
      signalR.invoke = jest.fn(() => response);

      effects = TestBed.get(BacklogCardEffects);

      expect(effects.archiveCardOnBacklog$).toBeObservable(expected);
    });

    it('should return an observable of ArchiveCardError if not successful', () => {
      const message = `It don't work`;
      signalRResult = {
        isSuccessful: false,
        message,
        item: false,
      };
      const mockArchiveCard = { ...mockCard, listId: 0 };
      action = new backlogActions.ArchiveCard({ card: mockArchiveCard, useRemainingHours: false, originalCard: mockCard });
      outcome = new backlogActions.ArchiveCardError(message);
      actions.stream = hot('-a', { a: action });
      response = cold('-a|', { a: signalRResult });
      expected = cold('--b', { b: outcome });
      signalR.invoke = jest.fn(() => response);
    });
  });
});
