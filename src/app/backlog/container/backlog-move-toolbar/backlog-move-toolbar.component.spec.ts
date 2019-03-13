import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TdTooltipDirective } from '@app/shared/directives/tooltip-directive';

import { BacklogMoveToolbarComponent } from './backlog-move-toolbar.component';
import { ButtonComponent } from '@app/shared/components/button/button.component';
import { Store } from '@ngrx/store';
import { hot, cold } from 'jasmine-marbles';
import { mockList, mockBoard, mockCard, mockCardBuilder, mockListBuilder, mockBoardBuilder } from '@app/test/data';
import { CardService } from '@app/app-services';
import { Card, Plan } from '@app/models';
import { of } from 'rxjs';

describe('BacklogMoveToolbarComponent', () => {
  let component: BacklogMoveToolbarComponent;
  let fixture: ComponentFixture<BacklogMoveToolbarComponent>;
  let store;
  let cardSvc: CardService;
  let spy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BacklogMoveToolbarComponent, ButtonComponent, TdTooltipDirective],
      providers: [
        { provide: Store, useValue: { dispatch: jest.fn(), pipe: jest.fn(), select: jest.fn() } },
        {
          provide: CardService,
          useValue: {
            moveCardUp: jest.fn(),
            moveCardDown: jest.fn(),
            moveCardToListInSameBoard: jest.fn(),
            moveCardWithInSameList: jest.fn(),
            moveCardOutsideProjectOrPlan: jest.fn(),
          },
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BacklogMoveToolbarComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onSelectCard', () => {
    it('should not highlight any buttons if there is no card selected', () => {
      store.pipe = jest.fn(() => hot('-a', { a: undefined }));
      fixture.detectChanges();

      expect(component.canMoveUp).toBeFalsy();
    });

    // TODO Get back to this. It's hard to test a combineLatest

    // it('should highlight all the buttons for a selected card in the middle of the list', () => {
    //   store.pipe = jest.fn(() => {
    //     hot('-a', { a: mockList });
    //     hot('--b', { b: mockBoard });
    //     hot('---c', { c: [mockBoard] });
    //   });

    //   component['onSelectedCard'](mockCard);
    //   expect(component.canMoveUp).toBeTruthy();
    // });
  });

  describe('move cards', () => {
    beforeEach(() => {
      cardSvc = TestBed.get(CardService);
    });

    it(`should call moveCardUp from card service if selected card's index is not 0`, () => {
      const mockCardOnMockList1: Card = { ...mockCard, listId: mockList.id };
      const mockCardOnMockList2: Card = { ...mockCardBuilder(), listId: mockList.id };
      const selectedCard: Card = { ...mockCardBuilder(), listId: mockList.id };
      mockList.cards = [mockCardOnMockList1, mockCardOnMockList2, selectedCard];
      spy = jest.spyOn(cardSvc, 'moveCardUp').mockImplementation(() => of({}));
      component.selectedCard = selectedCard;
      component.listWithSelectedCard = mockList;

      component.moveCardUp();

      expect(spy).toHaveBeenCalledWith(mockList, 2);
    });

    it(`should call moveCardToListInSameBoard from card service if selected card's index is 0`, () => {
      const selectedCard: Card = { ...mockCardBuilder(), listId: mockList.id };
      const extraMockList = mockListBuilder();
      mockList.cards = [selectedCard];
      spy = jest.spyOn(cardSvc, 'moveCardToListInSameBoard').mockImplementationOnce(() => of({ item: mockCard }));
      component.selectedCard = selectedCard;
      component.listWithSelectedCard = mockList;
      component.activeListsOnPlanWithSelectedCard = [extraMockList, mockList];

      component.moveCardUp();

      const selectedCardWithListId = { ...selectedCard, listId: extraMockList.id };

      expect(spy).toHaveBeenCalledWith(extraMockList.cards, selectedCardWithListId, mockList.id, 0);
    });

    it(`should call moveCardDown from card service if selected card's index is not at the end of the list`, () => {
      const mockCardOnMockList1: Card = { ...mockCard, listId: mockList.id };
      const mockCardOnMockList2: Card = { ...mockCardBuilder(), listId: mockList.id };
      const selectedCard: Card = { ...mockCardBuilder(), listId: mockList.id };
      mockList.cards = [selectedCard, mockCardOnMockList1, mockCardOnMockList2];
      spy = jest.spyOn(cardSvc, 'moveCardDown');
      component.selectedCard = selectedCard;
      component.listWithSelectedCard = mockList;

      component.moveCardDown();

      expect(spy).toHaveBeenCalledWith(mockList, 0);
    });

    it(`should call moveCardToListInSameBoard from card service if selected card's index is at the end of the list`, () => {
      const mockCardOnMockList1: Card = { ...mockCard, listId: mockList.id };
      const mockCardOnMockList2: Card = { ...mockCardBuilder(), listId: mockList.id };
      const selectedCard: Card = { ...mockCardBuilder(), listId: mockList.id };
      const extraMockList = mockListBuilder();
      mockList.cards = [mockCardOnMockList1, mockCardOnMockList2, selectedCard];

      component.selectedCard = selectedCard;
      component.listWithSelectedCard = mockList;
      component.activeListsOnPlanWithSelectedCard = [mockList, extraMockList];
      spy = jest.spyOn(cardSvc, 'moveCardToListInSameBoard').mockImplementationOnce(() => of({ item: { card: selectedCard } }));

      component.moveCardDown();

      const selectedCardWithListId = { ...selectedCard, listId: extraMockList.id };

      expect(spy).toHaveBeenCalledWith(extraMockList.cards, selectedCardWithListId, mockList.id, 0);
    });
  });

  describe('move card to top', () => {
    beforeEach(() => {
      cardSvc = TestBed.get(CardService);
    });
    it('should call move Card in same list if selected card is in top list', () => {
      const mockCardOnMockList1: Card = { ...mockCard, listId: mockList.id };
      const mockCardOnMockList2: Card = { ...mockCardBuilder(), listId: mockList.id };
      const selectedCard: Card = { ...mockCardBuilder(), listId: mockList.id, planId: mockBoard.id };
      mockList.cards = [mockCardOnMockList1, mockCardOnMockList2, selectedCard];
      spy = jest.spyOn(cardSvc, 'moveCardWithInSameList');
      component.selectedCard = selectedCard;
      component.listWithSelectedCard = mockList;
      component.activeListsOnPlanWithSelectedCard = [mockList];
      component.plansLoaded = [mockBoard];

      component.moveCardToTop();

      expect(spy).toHaveBeenCalledWith([selectedCard, mockCardOnMockList1, mockCardOnMockList2], 0);
    });

    it('should call moveCardToListInSameBoard if selected card is in top Plan', () => {
      const extraMockList = mockListBuilder();
      extraMockList.active = true;
      const mockCardOnMockList1: Card = { ...mockCard, listId: mockList.id, active: true };
      const mockCardOnMockList2: Card = { ...mockCardBuilder(), listId: mockList.id, active: true };
      const selectedCard: Card = { ...mockCardBuilder(), listId: extraMockList.id, planId: mockBoard.id };
      mockList.cards = [mockCardOnMockList1, mockCardOnMockList2];
      extraMockList.cards = [selectedCard];
      component.selectedCard = selectedCard;
      component.listWithSelectedCard = extraMockList;
      component.activeListsOnPlanWithSelectedCard = [mockList, extraMockList];
      component.plansLoaded = [mockBoard];
      spy = jest.spyOn(cardSvc, 'moveCardToListInSameBoard').mockImplementation(() => of({ item: { card: selectedCard } }));

      component.moveCardToTop();

      expect(spy).toHaveBeenCalled();
    });

    it('should call moveCardOutsideProjectOrPlan if selected card is outside first plan', () => {
      const extraMockPlan = mockBoardBuilder();
      const extraMockList = mockListBuilder();
      const mockCardOnMockList1: Card = { ...mockCard, listId: mockList.id };
      const mockCardOnMockList2: Card = { ...mockCardBuilder(), listId: mockList.id };
      const selectedCard: Card = { ...mockCardBuilder(), listId: extraMockList.id, planId: extraMockPlan.id };

      mockList.cards = [mockCardOnMockList1, mockCardOnMockList2];
      mockList.active = true;
      extraMockList.cards = [selectedCard];
      component.selectedCard = selectedCard;
      component.listWithSelectedCard = extraMockList;
      mockBoard.lists = [mockList];
      extraMockPlan.lists = [extraMockList];
      component.plansLoaded = [mockBoard, extraMockPlan];
      spy = jest.spyOn(cardSvc, 'moveCardOutsideProjectOrPlan').mockImplementationOnce(() => of({ item: { card: selectedCard } }));

      component.moveCardToTop();

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('move card to bottom', () => {
    beforeEach(() => {
      cardSvc = TestBed.get(CardService);
    });

    it('should call moveCard if card is in the bottom most list', () => {
      const extraMockPlan = mockBoardBuilder();
      const mockCardOnMockList1 = { ...mockCard, listId: mockList.id };
      const mockCardOnMockList2 = { ...mockCard, listId: mockList.id };
      const selectedCard = { ...mockCard, listId: mockList.id, planId: mockBoard.id };

      mockList.cards = [selectedCard, mockCardOnMockList2, mockCardOnMockList1];
      mockList.active = true;
      mockBoard.lists = mockList;
      component.selectedCard = selectedCard;
      component.listWithSelectedCard = mockList;
      component.activeListsOnPlanWithSelectedCard = [mockList];
      component.plansLoaded = [extraMockPlan, mockBoard];
      spy = jest.spyOn(cardSvc, 'moveCardWithInSameList');

      component.moveCardToBottom();

      expect(spy).toHaveBeenCalledWith([mockCardOnMockList2, mockCardOnMockList1, selectedCard], 2);
    });

    it('should dispatch to the store and call moveCardToListInSameBoard if card is in bottom plan', () => {
      const extraMockPlan = mockBoardBuilder();
      const extraMockList = mockListBuilder();
      const mockCardOnMockList1 = { ...mockCard, listId: mockList.id };
      const mockCardOnMockList2 = { ...mockCard, listId: mockList.id };
      const selectedCard = { ...mockCard, listId: extraMockList.id, planId: mockBoard.id };

      mockList.cards = [mockCardOnMockList1, mockCardOnMockList2];
      extraMockList.cards = [selectedCard];
      component.plansLoaded = [extraMockPlan, mockBoard];
      component.activeListsOnPlanWithSelectedCard = [extraMockList, mockList];
      component.listWithSelectedCard = extraMockList;
      component.selectedCard = selectedCard;
      spy = jest.spyOn(cardSvc, 'moveCardToListInSameBoard').mockImplementationOnce(() => of({ item: { card: selectedCard } }));

      component.moveCardToBottom();

      expect(spy).toHaveBeenCalledWith([mockCardOnMockList1, mockCardOnMockList2], selectedCard, extraMockList.id, 1);
    });

    it('should call moveCardOutsideProjectOrPlan if card is outside bottom plan', () => {
      const extraMockPlan: Plan = mockBoardBuilder();
      const extraMockList = mockListBuilder();
      const mockCardOnMockList1 = { ...mockCard, listId: mockList.id };
      const mockCardOnMockList2 = { ...mockCard, listId: mockList.id };
      const selectedCard = { ...mockCard, listId: extraMockList.id, planId: extraMockPlan.id };
      mockList.cards = [mockCardOnMockList1, mockCardOnMockList2];
      extraMockList.cards = [selectedCard];
      extraMockPlan.lists = [extraMockList];
      mockBoard.lists = [mockList];

      component.plansLoaded = [extraMockPlan, mockBoard];
      component.activeListsOnPlanWithSelectedCard = [extraMockList];
      component.listWithSelectedCard = extraMockList;
      component.selectedCard = selectedCard;
      spy = jest.spyOn(cardSvc, 'moveCardOutsideProjectOrPlan').mockImplementationOnce(() => of({ item: { card: selectedCard } }));

      component.moveCardToBottom();

      expect(spy).toHaveBeenCalledWith(selectedCard, mockBoard.projectId, mockBoard.id, mockList.id, 0);
    });
  });
});
