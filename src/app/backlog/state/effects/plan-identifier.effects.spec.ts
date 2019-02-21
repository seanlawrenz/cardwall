import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { SignalRService } from '@app/app-services';
import { TestActions, getActions } from '@app/test/mocks';

import * as backlogActions from '../actions';
import { PlanIdentifierEffects } from './plan-identifier.effects';
import { SignalRResult } from '@app/models';
import { mockPlans, mockPlan1, mockBoard, mockBoardBuilder } from '@app/test/data';
import { cold, hot } from 'jasmine-marbles';

/**
 * For testing effects that uses withLatestFrom the initialization order matter
 * initialize the store first.
 * Then for each block of tests initialize the mockActions and service mocks
 * Finally before the expect test initialize the effects.
 * This insures that the mocks are loaded into the effect with data and no observable fails
 */

describe('Plan Identifier Effects', () => {
  let actions: TestActions;
  let effects: PlanIdentifierEffects;
  let signalR: SignalRService;
  let store;
  let action;
  let outcome;
  let response;
  let expected;
  let successfulSignalRResult: SignalRResult;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PlanIdentifierEffects,
        { provide: Actions, useFactory: getActions },
        { provide: SignalRService, useValue: { invoke: jest.fn() } },
        {
          provide: Store,
          useValue: {
            dispatch: jest.fn(),
            pipe: jest.fn(),
            select: jest.fn(),
          },
        },
      ],
    });
    store = TestBed.get(Store);
  });

  it('should be created', () => {
    effects = TestBed.get(PlanIdentifierEffects);
    expect(effects).toBeTruthy();
  });

  describe('loadPlans', () => {
    beforeEach(() => {
      actions = TestBed.get(Actions);
      signalR = TestBed.get(SignalRService);
    });

    it('should return get available planSuccess action with the plans on success', () => {
      successfulSignalRResult = {
        isSuccessful: true,
        item: mockPlans,
      };
      action = new backlogActions.GetAvailablePlanIdentifers();
      outcome = new backlogActions.GetAvailablePlansIdentifersSuccess(mockPlans);
      store.select = jest.fn(() => cold('r', { r: [mockPlan1] }));
      actions.stream = hot('-a', { a: action });
      response = cold('-a|', { a: successfulSignalRResult });
      expected = cold('--b', { b: outcome });
      signalR.invoke = jest.fn(() => response);

      effects = TestBed.get(PlanIdentifierEffects);

      expect(effects.loadPlansIdentifiers$).toBeObservable(expected);
    });
  });
});
