import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { hot, cold } from 'jasmine-marbles';

import * as subtaskActions from '../actions/subtasks.actions';

import { CardDetailsSubtasksEffects } from './subtasks.effects';
import { SignalRService } from '@app/app-services';
import { SignalRResult } from '@app/models';

import { TestActions, getActions } from '@app/test/mocks';
import { mockSubtask, mockCard } from '@app/test/data';

describe('CardDetailsSubtasksEffects', () => {
  let actions: TestActions;
  let effects: CardDetailsSubtasksEffects;
  let signalR: SignalRService;
  let action;
  let outcome;
  let response;
  let expected;
  let signalRResult: SignalRResult;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CardDetailsSubtasksEffects,
        { provide: Actions, useFactory: getActions },
        { provide: SignalRService, useValue: { invoke: jest.fn() } },
      ],
    });
  });

  it('should be created', () => {
    effects = TestBed.get(CardDetailsSubtasksEffects);
    expect(effects).toBeTruthy();
  });

  describe('fetchSubtasks', () => {
    beforeEach(() => {
      actions = TestBed.get(Actions);
      signalR = TestBed.get(SignalRService);
    });

    it('should return an observable of FetchSubtasksSuccess', () => {
      signalRResult = {
        isSuccessful: true,
        item: [mockSubtask],
      };
      action = new subtaskActions.FetchSubtasks(mockCard);
      outcome = new subtaskActions.FetchSubtasksSuccess([mockSubtask]);
      actions.stream = hot('-a', { a: action });
      response = cold('-a|', { a: signalRResult });
      expected = cold('--b', { b: outcome });
      signalR.invoke = jest.fn(() => response);

      effects = TestBed.get(CardDetailsSubtasksEffects);

      expect(effects.fetchSubtasks$).toBeObservable(expected);
    });
  });

  describe('updateSubtask', () => {
    beforeEach(() => {
      actions = TestBed.get(Actions);
      signalR = TestBed.get(SignalRService);
    });

    it('should return an observable of UpdateSubtaskSuccess', () => {
      signalRResult = {
        isSuccessful: true,
        item: false,
      };
      action = new subtaskActions.UpdateSubtask({ subtask: mockSubtask, card: mockCard });
      outcome = new subtaskActions.UpdateSubtaskSuccess(mockSubtask);
      actions.stream = hot('-a', { a: action });
      response = cold('-a|', { a: signalRResult });
      expected = cold('--b', { b: outcome });
      signalR.invoke = jest.fn(() => response);

      effects = TestBed.get(CardDetailsSubtasksEffects);

      expect(effects.updateSubtask$).toBeObservable(expected);
    });

    it('should return an observable of UpdateSubtaskError if error', () => {
      signalRResult = {
        isSuccessful: false,
        reason: 'too many secrets',
        item: false,
      };
      action = new subtaskActions.UpdateSubtask({ subtask: mockSubtask, card: mockCard });
      outcome = new subtaskActions.UpdateSubtaskError('too many secrets');
      actions.stream = hot('-a', { a: action });
      response = cold('-a|', { a: signalRResult });
      expected = cold('--b', { b: outcome });
      signalR.invoke = jest.fn(() => response);

      effects = TestBed.get(CardDetailsSubtasksEffects);

      expect(effects.updateSubtask$).toBeObservable(expected);
    });
  });
});
