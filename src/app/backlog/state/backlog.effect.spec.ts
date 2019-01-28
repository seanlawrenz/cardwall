import { TestBed } from '@angular/core/testing';
import { TestActions, getActions } from '@app/test/mocks';
import { SignalRService } from '@app/app-services';
import { Actions } from '@ngrx/effects';
import { BacklogEffects } from './backlog.effects';
import { cold, hot } from 'jasmine-marbles';

import * as backlogActions from './backlog.actions';
import { mockPlans } from '@app/test/data';
import { SignalRResult } from '@app/models';

describe('Backlog effects', () => {
  let actions: TestActions;
  let effects: BacklogEffects;
  let signalR: SignalRService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BacklogEffects,
        { provide: Actions, useFactory: getActions },
        { provide: SignalRService, useValue: { invoke: jest.fn() } },
      ],
    });

    actions = TestBed.get(Actions);
    effects = TestBed.get(BacklogEffects);
    signalR = TestBed.get(SignalRService);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('loadPlans', () => {
    it('should return a list of plans', () => {
      const successfulSignalRResult: SignalRResult = {
        isSuccessful: true,
        item: mockPlans,
      };

      const action = new backlogActions.GetAvailableBoards();
      const outcome = new backlogActions.GetAvailableBoardsSuccess(mockPlans);

      actions.stream = hot('-a', { a: action });
      const response = cold('-a|', { a: successfulSignalRResult });
      const expected = cold('--b', { b: outcome });
      signalR.invoke = jest.fn(() => response);

      expect(effects.loadPlans$).toBeObservable(expected);
    });
  });
});
