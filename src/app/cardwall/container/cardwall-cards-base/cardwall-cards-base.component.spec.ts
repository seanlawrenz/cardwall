import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { CardwallCardsBaseComponent } from './cardwall-cards-base.component';
import { Store } from '@ngrx/store';

import * as cardwallActions from '@app/cardwall/state/actions';

import { mockBoard, mockList, mockCard } from '@app/test/data';
import { CardService } from '@app/app-services';

describe('CardwallCardsBaseComponent', () => {
  let component: CardwallCardsBaseComponent;
  let fixture: ComponentFixture<CardwallCardsBaseComponent>;
  let dragEvent;
  let spy;
  let store;
  let action;
  let cardSvc: CardService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CardwallCardsBaseComponent],
      providers: [
        { provide: Store, useValue: { pipe: jest.fn(), dispatch: jest.fn() } },
        {
          provide: CardService,
          useValue: { moveCardWithInSameList: jest.fn(() => ({ pipe: jest.fn(() => ({ subscribe: jest.fn() })) })) },
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardwallCardsBaseComponent);
    component = fixture.componentInstance;
    component.board = mockBoard;
    component.list = mockList;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('dragCardEnd', () => {
    beforeEach(() => {
      store = TestBed.get(Store);
      cardSvc = TestBed.get(CardService);
    });

    it('should dispatch CardMovementSave', () => {
      action = new cardwallActions.CardMovementSave();
      spy = jest.spyOn(store, 'dispatch');
      dragEvent = { card: mockCard, newIndex: 0 };

      component.dragCardEnd(dragEvent);

      expect(spy).toHaveBeenCalledWith(action);
    });

    it('should call moveCardWithInSameList if moved within list', () => {
      const cardWithinThisList = { ...mockCard, listId: mockList.id };
      const otherCardWithinThisList = { ...mockCard, listId: mockList.id };
      mockList.cards = [otherCardWithinThisList, cardWithinThisList];
      dragEvent = { card: cardWithinThisList, cards: [otherCardWithinThisList, cardWithinThisList], newIndex: 0 };
      spy = jest.spyOn(cardSvc, 'moveCardWithInSameList');

      component.dragCardEnd(dragEvent);

      expect(spy).toHaveBeenCalledWith(component.list.cards, 0);
    });
  });
});
