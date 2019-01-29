import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Store } from '@ngrx/store';
import * as actions from '../state/backlog.actions';
import { hot, cold, getTestScheduler } from 'jasmine-marbles';

import { BacklogBaseComponent } from './backlog-base.component';

describe('BacklogBaseComponent', () => {
  let component: BacklogBaseComponent;
  let fixture: ComponentFixture<BacklogBaseComponent>;

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
});
