import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Store } from '@ngrx/store';
import * as actions from '../state/backlog.actions';
import { hot, cold, getTestScheduler } from 'jasmine-marbles';

import { BacklogBaseComponent } from './backlog-base.component';
import { mockPlans } from '@app/test/data';
import { last } from 'rxjs/operators';

describe('BacklogBaseComponent', () => {
  let component: BacklogBaseComponent;
  let fixture: ComponentFixture<BacklogBaseComponent>;
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
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should dispatch get available boards action', () => {
      action = new actions.GetAvailableBoards();
      store = TestBed.get(Store);
      spy = jest.spyOn(store, 'dispatch');

      fixture.detectChanges();
      expect(spy).toHaveBeenCalledWith(action);
    });

    it('should fetch plan identifiers', () => {
      store = TestBed.get(Store);
      store.pipe = jest.fn(() => hot('-a', { a: mockPlans }));

      fixture.detectChanges();
      expected = cold('-a', { a: mockPlans });
      expect(component.planIdentifiers$).toBeObservable(expected);
    });

    describe('plan identifiers', () => {
      it('should be an observable of an array of plan identifiers', done => {
        store = TestBed.get(Store);
        store.pipe = jest.fn(() => cold('-a|', { a: mockPlans }));

        fixture.detectChanges();

        component.planIdentifiers$.pipe(last()).subscribe(plans => {
          expect(plans).toEqual(mockPlans);
          done();
        });
        getTestScheduler().flush();
      });
    });

    describe('errors', () => {
      it('should be an observable of a string of the error', done => {
        const errorMessage = 'Network error';
        store = TestBed.get(Store);
        store.pipe = jest.fn(() => cold('-a|', { a: errorMessage }));

        fixture.detectChanges();

        component.errorMessage$.pipe(last()).subscribe(error => {
          expect(error).toEqual(errorMessage);
          done();
        });
        getTestScheduler().flush();
      });
    });
  });
});
