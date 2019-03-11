import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TdTooltipDirective } from '@app/shared/directives/tooltip-directive';

import { BacklogMoveToolbarComponent } from './backlog-move-toolbar.component';
import { ButtonComponent } from '@app/shared/components/button/button.component';
import { Store } from '@ngrx/store';
import { hot, cold } from 'jasmine-marbles';
import { mockList, mockBoard, mockCard, mockCardBuilder, mockListBuilder } from '@app/test/data';
import { CardService } from '@app/app-services';
import { Card } from '@app/models';
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
        { provide: CardService, useValue: { moveCardUp: jest.fn(), moveCardDown: jest.fn(), moveCardToListInSameBoard: jest.fn() } },
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
      spy = jest.spyOn(cardSvc, 'moveCardToListInSameBoard').mockImplementationOnce(() => of({}));

      component.moveCardDown();

      const selectedCardWithListId = { ...selectedCard, listId: extraMockList.id };

      expect(spy).toHaveBeenCalledWith(extraMockList.cards, selectedCardWithListId, mockList.id, 0);
    });
  });
});
