import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BacklogListControllerComponent } from './backlog-list-controller.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { mockList, mockBoard } from '@app/test/data';
import { Store } from '@ngrx/store';

import * as backlogActions from '@app/backlog/state/backlog.actions';

describe('BacklogListControllerComponent', () => {
  let component: BacklogListControllerComponent;
  let fixture: ComponentFixture<BacklogListControllerComponent>;
  let action;
  let spy;
  let store;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BacklogListControllerComponent],
      providers: [{ provide: Store, useValue: { dispatch: jest.fn() } }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BacklogListControllerComponent);
    component = fixture.componentInstance;
    component.lists = [mockList];
    component.projectId = mockBoard.projectId;
    component.planId = mockBoard.id;
    store = TestBed.get(Store);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch an action on list reorder if there was reordering of lists', () => {
    const mockEvent = {
      newIndex: 2,
      oldIndex: 1,
    };
    const mockPayload = {
      lists: [mockList],
      projectId: mockBoard.projectId,
      planId: mockBoard.id,
    };
    action = new backlogActions.ReorderListsOnPlans(mockPayload);
    spy = jest.spyOn(store, 'dispatch');

    component.listReorder(mockEvent);
    expect(spy).toHaveBeenCalledWith(action);
  });
});
