import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { hot, cold } from 'jasmine-marbles';

import * as cardwallActions from '../actions';

import { BoardEffects } from './board.effects';
import { BoardService, SignalRService } from '@app/app-services';
import { SignalRResult } from '@app/models';

import { TestActions, getActions } from '@app/test/mocks';
import { mockBoard } from '@app/test/data';

describe('BoardEffects', () => {
  let actions: TestActions;
  let effects: BoardEffects;
  let action;
  let outcome;
  let response;
  let expected;
  let store;
  let boardSvc: BoardService;
  let signalRResult: SignalRResult;
  let mockParams;
  let signalR: SignalRService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BoardEffects,
        { provide: Actions, useFactory: getActions },
        { provide: BoardService, useValue: { fetchBoard: jest.fn() } },
        { provide: SignalRService, useValue: jest.fn() },
        { provide: Store, useValue: { select: jest.fn() } },
      ],
    });
  });

  it('should be created', () => {
    effects = TestBed.get(BoardEffects);
    expect(effects).toBeTruthy();
  });

  describe('loadBoard$', () => {
    beforeEach(() => {
      actions = TestBed.get(Actions);
      store = TestBed.get(Store);
      boardSvc = TestBed.get(BoardService);
    });

    it('should return an observable of GetBoardSuccess', () => {
      mockParams = { state: { params: { projectId: mockBoard.projectId, planId: mockBoard.id } } };
      signalRResult = { isSuccessful: true, item: mockBoard };

      action = new cardwallActions.GetBoard();
      outcome = new cardwallActions.GetBoardSuccess(mockBoard);

      store.select = jest.fn(() => cold('a', { a: mockParams }));
      actions.stream = hot('-a', { a: action });
      response = cold('-a|', { a: signalRResult });
      expected = cold('--b', { b: outcome });
      boardSvc.fetchBoard = jest.fn(() => response);

      effects = TestBed.get(BoardEffects);

      expect(effects.loadBoard$).toBeObservable(expected);
    });
  });

  describe('editBoard$', () => {
    beforeEach(() => {
      actions = TestBed.get(Actions);
      signalR = TestBed.get(SignalRService);
    });

    it('should return an observable of EditBoardSuccess', () => {
      signalRResult = { isSuccessful: true, item: false };

      action = new cardwallActions.EditBoardName(mockBoard);
      outcome = new cardwallActions.EditBoardNameSuccess({ name: mockBoard.name, description: mockBoard.description });

      actions.stream = hot('-a', { a: action });
      response = cold('-a|', { a: signalRResult });
      expected = cold('--b', { b: outcome });
      signalR.invoke = jest.fn(() => response);

      effects = TestBed.get(BoardEffects);

      expect(effects.editBoard$).toBeObservable(expected);
    });
  });
});
