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
        {
          provide: Store,
          useValue: { pipe: jest.fn(), dispatch: jest.fn(), select: jest.fn(() => ({ pipe: jest.fn(() => ({ subscribe: jest.fn() })) })) },
        },
        {
          provide: CardService,
          useValue: {
            moveCardWithInSameList: jest.fn(() => ({ pipe: jest.fn(() => ({ subscribe: jest.fn() })) })),
            moveCardToListInSameBoard: jest.fn(),
          },
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

    it('should call moveCardWithInSameList if moved within list', () => {
      const cardWithinThisList = { ...mockCard, listId: mockList.id };
      const otherCardWithinThisList = { ...mockCard, listId: mockList.id };
      mockList.cards = [otherCardWithinThisList, cardWithinThisList];
      dragEvent = { card: cardWithinThisList, cards: [otherCardWithinThisList, cardWithinThisList], newIndex: 0 };
      spy = jest.spyOn(cardSvc, 'moveCardWithInSameList');
      action = new cardwallActions.CardMovementSave();
      const dispatchSpy = jest.spyOn(store, 'dispatch');

      component.dragCardEnd(dragEvent);

      expect(spy).toHaveBeenCalledWith(component.list.cards, 0);
      expect(dispatchSpy).toHaveBeenCalledWith(action);
    });

    it('should call CardMoveToNewList if moved to new list', () => {
      const otherList = { ...mockList, id: 123 };
      const cardThatIsBeingMovedToNewList = { ...mockCard, listId: otherList.id };
      const otherCardFromOtherList = { ...mockCard, listId: otherList.id };
      otherList.cards = [otherCardFromOtherList];
      mockList.cards = [cardThatIsBeingMovedToNewList];
      dragEvent = { card: cardThatIsBeingMovedToNewList, cards: [], newIndex: 0 };
      const sameListSpy = jest.spyOn(cardSvc, 'moveCardWithInSameList');
      action = new cardwallActions.CardMoveToNewList({ card: cardThatIsBeingMovedToNewList, listId: mockList.id, newIndex: 0 });
      spy = jest.spyOn(store, 'dispatch');

      component.dragCardEnd(dragEvent);

      expect(sameListSpy).not.toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith(action);
    });
  });
});
