import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import * as actions from '../../state/actions';
import { hot, cold, getTestScheduler } from 'jasmine-marbles';

import { mockPlans, mockPlan1, mockPlan2 } from '@app/test/data';
import { last } from 'rxjs/operators';

import { BsModalRef, BsModalService, ModalModule } from 'ngx-bootstrap/modal';

import { AddBoardBaseComponent } from './add-board-base.component';
import { Router } from '@angular/router';

describe('AddBoardBaseComponent', () => {
  let component: AddBoardBaseComponent;
  let fixture: ComponentFixture<AddBoardBaseComponent>;
  let action;
  let store;
  let spy;
  let expected;
  let router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddBoardBaseComponent],
      imports: [RouterTestingModule, ModalModule.forRoot()],
      providers: [{ provide: Store, useValue: { dispatch: jest.fn(), pipe: jest.fn() } }, BsModalService],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBoardBaseComponent);
    component = fixture.componentInstance;
    component.dialogRef = { hide: jest.fn(), setClass: jest.fn() };
    router = TestBed.get(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('getAvailableBoards', () => {
    it('should dispatch get available boards action', () => {
      action = new actions.GetAvailablePlanIdentifers();
      store = TestBed.get(Store);
      spy = jest.spyOn(store, 'dispatch');
      component.getAvailableBoards();

      expect(spy).toHaveBeenCalledWith(action);
    });

    it('should fetch plan identifiers', () => {
      store = TestBed.get(Store);
      store.pipe = jest.fn(() => hot('-a', { a: mockPlans }));
      expected = cold('-a', { a: mockPlans });

      component.getAvailableBoards();

      expect(component.planIdentifiers$).toBeObservable(expected);
    });

    describe('plan identifiers', () => {
      it('should be an observable of an array of plan identifiers', done => {
        store = TestBed.get(Store);
        store.pipe = jest.fn(() => cold('-a|', { a: mockPlans }));

        component.getAvailableBoards();

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

        component.getAvailableBoards();

        component.errorMessage$.pipe(last()).subscribe(error => {
          expect(error).toEqual(errorMessage);
          done();
        });
        getTestScheduler().flush();
      });
    });
  });

  describe('addPlansToBacklog', () => {
    it('should update the route', () => {
      spy = spyOn(router, 'navigate');
      component.addPlansToBacklog([mockPlan1, mockPlan2]);
      expect(spy).toHaveBeenCalled();
    });

    it('should not update the route if no plans selected', () => {
      spy = spyOn(router, 'navigate');
      component.addPlansToBacklog([]);
      expect(spy).not.toHaveBeenCalled();
    });

    it('should not update if too many plans selected', () => {
      spy = spyOn(router, 'navigate');
      component.addPlansToBacklog([
        mockPlan1,
        mockPlan1,
        mockPlan1,
        mockPlan1,
        mockPlan1,
        mockPlan1,
        mockPlan1,
        mockPlan1,
        mockPlan1,
        mockPlan1,
        mockPlan1,
      ]);
      expect(spy).not.toHaveBeenCalled();
    });
  });
});
