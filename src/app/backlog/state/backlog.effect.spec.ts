import { TestBed } from '@angular/core/testing';
import { TestActions, getActions } from '@app/test/mocks';
import { BoardService, SignalRService } from '@app/app-services';
import { Store } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { BacklogEffects } from './backlog.effects';
import { cold, hot } from 'jasmine-marbles';
import { of } from 'rxjs';

import * as backlogActions from './backlog.actions';
import { mockPlans } from '@app/test/data';
import { SignalRResult } from '@app/models';

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

    actions = TestBed.get(Actions);
    effects = TestBed.get(BacklogEffects);
    signalR = TestBed.get(SignalRService);
    boardSvc = TestBed.get(BoardService);
    store = TestBed.get(Store);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  // describe('getting boards from the params', () => {
  //   it('should return an empty array if no params', () => {
  //     const params = { state: { queryParams: {} } };
  //     successfulSignalRResult = { isSuccessful: true, item: [] };
  //     action = new backlogActions.GetBoardsInParams();
  //     outcome = new backlogActions.GetAvailableBoardsSuccess([]);
  //     actions.stream = hot('-a', { a: action });
  //     store.select = jest.fn(() => of(params));
  //     expected = cold('--b', { b: outcome });
  //     boardSvc.getBoardsFromParams = jest.fn(() => successfulSignalRResult);
  //     expect(effects.loadPlansOnParams$).toBeObservable({});
  //   });
  // });

  describe('loadPlans', () => {
    it('should return a list of plans', () => {
      successfulSignalRResult = {
        isSuccessful: true,
        item: mockPlans,
      };
      action = new backlogActions.GetAvailableBoards();
      outcome = new backlogActions.GetAvailableBoardsSuccess(mockPlans);
      actions.stream = hot('-a', { a: action });
      response = cold('-a|', { a: successfulSignalRResult });
      expected = cold('--b', { b: outcome });
      signalR.invoke = jest.fn(() => response);
      expect(effects.loadPlans$).toBeObservable(expected);
    });
  });
});
