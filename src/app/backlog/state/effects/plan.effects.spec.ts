import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { SignalRService, BoardService } from '@app/app-services';
import { TestActions, getActions } from '@app/test/mocks';

import { mockBoard, mockBoardBuilder } from '@app/test/data';

import * as backlogActions from '../actions';
import { PlanEffects } from './plan.effects';
import { SignalRResult, Plan } from '@app/models';
import { cold, hot } from 'jasmine-marbles';

describe('Plan Effects', () => {
  let actions: TestActions;
  let effects: PlanEffects;
  let signalR: SignalRService;
  let boardSvc: BoardService;
  let action;
  let outcome;
  let response;
  let expected;
  let store;
  let mockParams;
  const mockBoard2 = mockBoardBuilder();

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PlanEffects,
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
    effects = TestBed.get(PlanEffects);
    expect(effects).toBeTruthy();
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

      effects = TestBed.get(PlanEffects);
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

      effects = TestBed.get(PlanEffects);
      expect(effects.loadPlansOnParams$).toBeObservable(expected);
    });
  });

  describe('loadPlans', () => {
    beforeEach(() => {
      actions = TestBed.get(Actions);
      boardSvc = TestBed.get(BoardService);
    });

    it('should return an action of getPlansSuccess with plans that are added for a backlog with no currently loaded plans', () => {
      action = new backlogActions.AddPlan(`${mockBoard.projectId}_${mockBoard.id}`);
      outcome = new backlogActions.GetPlansSuccess([mockBoard]);

      store.select = jest.fn(() => cold('a', { a: [] }));
      actions.stream = hot('-a', { a: action });
      response = cold('-a|', { a: [mockBoard] });
      expected = cold('--b', { b: outcome });
      boardSvc.getPlansFromParams = jest.fn(() => response);

      effects = TestBed.get(PlanEffects);
      expect(effects.loadPlan$).toBeObservable(expected);
    });

    it('should return an action of getPlansSuccess with the new plan an previously added plans', () => {
      action = new backlogActions.AddPlan(`${mockBoard.projectId}_${mockBoard.id}`);

      outcome = new backlogActions.GetPlansSuccess([mockBoard2, mockBoard]);
      store.select = jest.fn(() => cold('a', { a: [mockBoard2] }));
      actions.stream = hot('-a', { a: action });
      response = cold('-a|', { a: [mockBoard2, mockBoard] });
      expected = cold('--b', { b: outcome });
      boardSvc.getPlansFromParams = jest.fn(() => response);

      effects = TestBed.get(PlanEffects);
      expect(effects.loadPlan$).toBeObservable(expected);
    });
  });

  describe('removePlan', () => {
    beforeEach(() => {
      actions = TestBed.get(Actions);
      signalR = TestBed.get(SignalRService);
    });

    it('should remove the plan from the list of plans on state and remove plan from signalr group if last of the projects', () => {
      const mockBoard1: Plan = mockBoardBuilder();
      const mockBoard3: Plan = mockBoardBuilder();
      mockBoard1.projectId = 1;
      mockBoard3.projectId = 3;
      mockBoard2.projectId = 2;
      action = new backlogActions.RemovePlan({ planId: mockBoard2.id });
      outcome = new backlogActions.GetPlansSuccess([mockBoard1, mockBoard3]);

      store.select = jest.fn(() => cold('a', { a: [mockBoard1, mockBoard2, mockBoard3] }));
      actions.stream = hot('-a', { a: action });
      response = cold('-a|', { a: { isSuccessful: true } });
      expected = cold('--b', { b: outcome });
      signalR.invoke = jest.fn(() => response);

      effects = TestBed.get(PlanEffects);
      expect(effects.removePlan$).toBeObservable(expected);
    });

    it('should remove the plan but not call to remove from signalR group if other plans are part of the project', () => {
      const mockBoard1: Plan = mockBoardBuilder();
      const mockBoard3: Plan = mockBoardBuilder();
      mockBoard1.projectId = 1;
      mockBoard3.projectId = 1;
      mockBoard2.projectId = 1;
      const spy = jest.spyOn(signalR, 'invoke');

      action = new backlogActions.RemovePlan({ planId: mockBoard2.id });
      outcome = new backlogActions.GetPlansSuccess([mockBoard1, mockBoard3]);

      store.select = jest.fn(() => cold('a', { a: [mockBoard1, mockBoard2, mockBoard3] }));
      actions.stream = hot('-a', { a: action });
      response = cold('-a|', { a: { isSuccessful: true } });
      expected = cold('-b', { b: outcome });

      effects = TestBed.get(PlanEffects);
      expect(effects.removePlan$).toBeObservable(expected);
      expect(spy).not.toHaveBeenCalled();
    });
  });
});
