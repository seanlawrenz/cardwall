import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { CardDetailsBaseComponent } from './card-details-base.component';
import { hot, cold } from 'jasmine-marbles';
import { mockCard } from '@app/test/data';
import { Subject } from 'rxjs';

describe('CardDetailsBaseComponent', () => {
  let component: CardDetailsBaseComponent;
  let fixture: ComponentFixture<CardDetailsBaseComponent>;
  const unsubscribe = new Subject<void>();
  let store;
  let expected;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CardDetailsBaseComponent],
      providers: [{ provide: Store, useValue: { pipe: jest.fn() } }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardDetailsBaseComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
  });

  afterEach(() => {
    unsubscribe.next();
    unsubscribe.complete();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should get current card for display', () => {
      store.pipe = jest.fn(() => hot('-a', { a: mockCard }));

      fixture.detectChanges();

      expected = cold('-a', { a: mockCard });
      expect(component.card$).toBeObservable(expected);
    });
  });
});
