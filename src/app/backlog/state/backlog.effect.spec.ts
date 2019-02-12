import { TestBed } from '@angular/core/testing';
import { TestActions, getActions } from '@app/test/mocks';
import { BoardService, SignalRService } from '@app/app-services';
import { Store } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { BacklogEffects } from './backlog.effects';
import { cold, hot } from 'jasmine-marbles';

import * as backlogActions from './backlog.actions';
import { mockPlans, mockPlan1, mockBoard, mockBoardBuilder } from '@app/test/data';
import { SignalRResult, Plan } from '@app/models';

/**
 * For testing effects that uses withLatestFrom the initialization order matter
 * initialize the store first.
 * Then for each block of tests initialize the mockActions and service mocks
 * Finally before the expect test initialize the effects.
 * This insures that the mocks are loaded into the effect with data and no observable fails
 */
describe('Backlog effects', () => {
  let actions: TestActions;
  let effects: BacklogEffects;
  let signalR: SignalRService;
  let boardSvc: BoardService;
  let action;
  let outcome;
  let response;
  let expected;
  let successfulSignalRResult: SignalRResult;
  let store;
  let mockParams;
  const mockBoard2 = mockBoardBuilder();

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BacklogEffects,
        { provide: Actions, useFactory: getActions },
        { provide: SignalRService, useValue: { invoke: jest.fn() } },
        { provide: BoardService, useValue: { getBoardsFromParams: jest.fn() } },
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
    effects = TestBed.get(BacklogEffects);
    expect(effects).toBeTruthy();
  });

  describe('loadPlans', () => {
    beforeEach(() => {
      actions = TestBed.get(Actions);
      signalR = TestBed.get(SignalRService);
    });

    describe('loadPlans', () => {
      it('should return get available planSuccess action with the plans on success', () => {
        successfulSignalRResult = {
          isSuccessful: true,
          item: mockPlans,
        };
        action = new backlogActions.GetAvailablePlans();
        outcome = new backlogActions.GetAvailablePlansSuccess(mockPlans);
        store.select = jest.fn(() => cold('r', { r: [mockPlan1] }));
        actions.stream = hot('-a', { a: action });
        response = cold('-a|', { a: successfulSignalRResult });
        expected = cold('--b', { b: outcome });
        signalR.invoke = jest.fn(() => response);

        effects = TestBed.get(BacklogEffects);

        expect(effects.loadPlansIdentifiers$).toBeObservable(expected);
      });
    });
  });

  describe('loadPlansOnParams', () => {
    beforeEach(() => {
      actions = TestBed.get(Actions);
      boardSvc = TestBed.get(BoardService);
    });

    it('should return action of getPlanSuccess with no boards on Success', () => {
      mockParams = { state: { queryParams: {} } };

      action = new backlogActions.GetPlansInParams();
      outcome = new backlogActions.GetPlansSuccess([]);

      store.select = jest.fn(() => cold('a', { a: mockParams }));
      actions.stream = hot('-a', { a: action });
      response = cold('-a|', { a: [] });
      expected = cold('--b', { b: outcome });
      boardSvc.getPlansFromParams = jest.fn(() => response);

      effects = TestBed.get(BacklogEffects);
      expect(effects.loadPlansOnParams$).toBeObservable(expected);
    });

    it('should return action of getPlanSuccess with plans that are on QueryParams', () => {
      mockParams = {
        state: { queryParams: { boards: `${mockBoard.projectId}_${mockBoard.id},${mockBoard2.projectId}_${mockBoard2.id}` } },
      };

      action = new backlogActions.GetPlansInParams();
      outcome = new backlogActions.GetPlansSuccess([mockBoard, mockBoard2]);

      store.select = jest.fn(() => cold('a', { a: mockParams }));
      actions.stream = hot('-a', { a: action });
      response = cold('-a|', { a: [mockBoard, mockBoard2] });
      expected = cold('--b', { b: outcome });
      boardSvc.getPlansFromParams = jest.fn(() => response);

      effects = TestBed.get(BacklogEffects);
      expect(effects.loadPlansOnParams$).toBeObservable(expected);
    });
  });

  describe('loadPlans', () => {
    beforeEach(() => {
      actions = TestBed.get(Actions);
      boardSvc = TestBed.get(BoardService);
    });

    it('should return an action of getPlansSuccess with plans that are added for a backlog with no currently loaded plans', () => {
      action = new backlogActions.AddBoard(`${mockBoard.projectId}_${mockBoard.id}`);
      outcome = new backlogActions.GetPlansSuccess([mockBoard]);

      store.select = jest.fn(() => cold('a', { a: [] }));
      actions.stream = hot('-a', { a: action });
      response = cold('-a|', { a: [mockBoard] });
      expected = cold('--b', { b: outcome });
      boardSvc.getPlansFromParams = jest.fn(() => response);

      effects = TestBed.get(BacklogEffects);
      expect(effects.loadPlans).toBeObservable(expected);
    });

    it('should return an action of getPlansSuccess with the new plan an previously added plans', () => {
      action = new backlogActions.AddBoard(`${mockBoard.projectId}_${mockBoard.id}`);
      outcome = new backlogActions.GetPlansSuccess([mockBoard2, mockBoard]);

      store.select = jest.fn(() => cold('a', { a: [mockBoard2] }));
      actions.stream = hot('-a', { a: action });
      response = cold('-a|', { a: [mockBoard2, mockBoard] });
      expected = cold('--b', { b: outcome });
      boardSvc.getPlansFromParams = jest.fn(() => response);

      effects = TestBed.get(BacklogEffects);
      expect(effects.loadPlans).toBeObservable(expected);
    });
  });

  describe('removePlan', () => {
    beforeEach(() => {
      actions = TestBed.get(Actions);
      signalR = TestBed.get(SignalRService);
    });

    it('should remove the plan from the list of plans on state and remove plan from signalr', () => {
      const mockBoard1: Plan = mockBoardBuilder();
      const mockBoard3: Plan = mockBoardBuilder();
      action = new backlogActions.RemoveBoard({ planId: mockBoard2.id });
      outcome = new backlogActions.GetPlansSuccess([mockBoard1, mockBoard3]);

      store.select = jest.fn(() => cold('a', { a: [mockBoard1, mockBoard2, mockBoard3] }));
      actions.stream = hot('-a', { a: action });
      response = cold('-a|', { a: { isSuccessful: true } });
      expected = cold('--b', { b: outcome });
      signalR.invoke = jest.fn(() => response);

      effects = TestBed.get(BacklogEffects);
      expect(effects.removePlan$).toBeObservable(expected);
    });
  });
});
