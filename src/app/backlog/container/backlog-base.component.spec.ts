import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Store } from '@ngrx/store';
import * as actions from '../state/backlog.actions';
import { hot, cold, getTestScheduler } from 'jasmine-marbles';

import * as backlogActions from '../state/backlog.actions';

import { BacklogBaseComponent } from './backlog-base.component';
import { Subject } from 'rxjs';
import { mockBoard } from '@app/test/data';

describe('BacklogBaseComponent', () => {
  let component: BacklogBaseComponent;
  let fixture: ComponentFixture<BacklogBaseComponent>;
  const unsubscribe = new Subject<void>();
  let action;
  let store;
  let spy;
  let expected;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BacklogBaseComponent],
      providers: [{ provide: Store, useValue: { dispatch: jest.fn(), pipe: jest.fn() } }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BacklogBaseComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
  });

  afterEach(() => {
    unsubscribe.next();
    unsubscribe.complete();
  });

  describe('get Boards In Params', () => {
    it('should dispatch at the getBords in params', () => {
      action = new backlogActions.GetPlansInParams();
      spy = jest.spyOn(store, 'dispatch');

      component.getBoardsInParams();
      expect(spy).toHaveBeenCalledWith(action);
    });

    it('should get all plans', () => {
      store.pipe = jest.fn(() => hot('-a', { a: [mockBoard] }));

      component.getBoardsInParams();

      expected = cold('-a', { a: [mockBoard] });
      expect(component.plans$).toBeObservable(expected);
    });
  });

  describe('plans', () => {
    it('should be an observable of an arry of plans', done => {
      store.pipe = jest.fn(() => hot('-a|', { a: [mockBoard] }));

      component.getBoardsInParams();

      component.plans$.subscribe(plans => {
        expect(plans).toEqual([mockBoard]);
        done();
      });

      getTestScheduler().flush();
    });
  });

  describe('error from server', () => {
    it('should display the error', done => {
      store.pipe = jest.fn(() => hot('-a|', { a: 'You do not have access to this board' }));

      component.getBoardsInParams();

      component.errorMessage$.subscribe(message => {
        expect(message).toEqual(message);
        done();
      });
      getTestScheduler().flush();
    });
  });
});
