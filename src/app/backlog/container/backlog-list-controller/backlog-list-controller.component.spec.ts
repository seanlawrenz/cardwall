import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BacklogListControllerComponent } from './backlog-list-controller.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { mockBoard, mockList } from '@app/test/data';
import { Store } from '@ngrx/store';

import * as backlogActions from '@app/backlog/state/actions';
import { of } from 'rxjs';
import { hot, cold } from 'jasmine-marbles';

describe('BacklogListControllerComponent', () => {
  let component: BacklogListControllerComponent;
  let fixture: ComponentFixture<BacklogListControllerComponent>;
  let action;
  let spy;
  let store;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BacklogListControllerComponent],
      providers: [{ provide: Store, useValue: { dispatch: jest.fn(), pipe: jest.fn() } }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BacklogListControllerComponent);
    component = fixture.componentInstance;
    component.projectId = mockBoard.projectId;
    component.planId = mockBoard.id;
    store = TestBed.get(Store);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngInit', () => {
    it('should select getListsByPlan', () => {
      spy = jest.spyOn(store, 'pipe').mockImplementationOnce(jest.fn(() => of([mockList])));

      fixture.detectChanges();

      expect(spy).toHaveBeenCalled();
    });

    it('should get lists for that plan', () => {
      store.pipe = jest.fn(() => hot('-a', { a: [mockList] }));

      fixture.detectChanges();

      const expected = cold('-a', { a: [mockList] });
      expect(component.lists$).toBeObservable(expected);
    });
  });

  it('should dispatch an action on list reorder if there was reordering of lists', () => {
    const mockEvent = {
      newIndex: 2,
      oldIndex: 1,
    };
    const mockPayload = {
      projectId: mockBoard.projectId,
      planId: mockBoard.id,
    };
    action = new backlogActions.ReorderListsOnPlans(mockPayload);
    spy = jest.spyOn(store, 'dispatch');

    component.listReorder(mockEvent);
    expect(spy).toHaveBeenCalledWith(action);
  });
});
