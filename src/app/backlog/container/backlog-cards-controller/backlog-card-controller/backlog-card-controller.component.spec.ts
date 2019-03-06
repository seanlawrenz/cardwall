import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BacklogCardControllerComponent } from './backlog-card-controller.component';
import { Store } from '@ngrx/store';
import { hot, cold } from 'jasmine-marbles';
import { NO_ERRORS_SCHEMA } from '@angular/compiler/src/core';

import * as rootActions from '@app/store/actions/card.actions';
import { mockCard } from '@app/test/data';

describe('BacklogCardControllerComponent', () => {
  let component: BacklogCardControllerComponent;
  let fixture: ComponentFixture<BacklogCardControllerComponent>;
  let store;
  let expected;
  let spy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BacklogCardControllerComponent],
      providers: [{ provide: Store, useValue: { dispatch: jest.fn(), pipe: jest.fn(), select: jest.fn() } }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BacklogCardControllerComponent);
    component = fixture.componentInstance;
    component.card = mockCard;
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

  it('should dispatch that a card has been selected', () => {
    const action = new rootActions.CardSelected(mockCard);
    store.pipe = jest.fn(() => hot('-a', { a: true }));
    spy = jest.spyOn(store, 'dispatch');

    fixture.detectChanges();
    component.selectCard();

    expect(spy).toHaveBeenCalledWith(action);
  });
});
