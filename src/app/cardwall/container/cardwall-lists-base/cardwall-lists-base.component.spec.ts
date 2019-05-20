import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Store } from '@ngrx/store';
import { hot, getTestScheduler } from 'jasmine-marbles';
import { CardwallListsBaseComponent } from './cardwall-lists-base.component';
import { ErrorFromSignalR } from '@app/models';
import { mockBoard, mockList } from '@app/test/data';

describe('CardwallListsBaseComponent', () => {
  let component: CardwallListsBaseComponent;
  let fixture: ComponentFixture<CardwallListsBaseComponent>;
  let store;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CardwallListsBaseComponent],
      providers: [{ provide: Store, useValue: { pipe: jest.fn() } }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardwallListsBaseComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    beforeEach(() => (store = TestBed.get(Store)));

    it('should get the board', done => {
      store.pipe = jest.fn(() => hot('-a|', { a: mockBoard }));

      fixture.detectChanges();

      component.board$.subscribe(board => {
        expect(board).toEqual(mockBoard);
        done();
      });

      getTestScheduler().flush();
    });

    it('should get the lists', done => {
      store.pipe = jest.fn(() => hot('-a|', { a: [mockList] }));

      fixture.detectChanges();

      component.lists$.subscribe(lists => {
        expect(lists).toEqual([mockList]);
        done();
      });

      getTestScheduler().flush();
    });

    it('should get the errors', done => {
      const error: ErrorFromSignalR = { message: 'error', reason: `We're testing errors` };
      store.pipe = jest.fn(() => hot('-a|', { a: error }));

      fixture.detectChanges();

      component.error$.subscribe(err => {
        expect(err).toEqual(error);
        done();
      });

      getTestScheduler().flush();
    });
  });
});
