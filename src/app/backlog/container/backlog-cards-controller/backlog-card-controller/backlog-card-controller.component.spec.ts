import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BacklogCardControllerComponent } from './backlog-card-controller.component';
import { Store } from '@ngrx/store';
import { hot, cold } from 'jasmine-marbles';
import { NO_ERRORS_SCHEMA } from '@angular/compiler/src/core';

describe('BacklogCardControllerComponent', () => {
  let component: BacklogCardControllerComponent;
  let fixture: ComponentFixture<BacklogCardControllerComponent>;
  let store;
  let expected;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BacklogCardControllerComponent],
      providers: [{ provide: Store, useValue: { pipe: jest.fn(), select: jest.fn() } }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BacklogCardControllerComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should subscribe to the store for changes to show estimate hours', () => {
    store.pipe = jest.fn(() => hot('-a', { a: true }));

    fixture.detectChanges();
    expected = cold('-a', { a: true });

    expect(component.showEstimateHours$).toBeObservable(expected);
  });
});
