import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SortablejsModule } from 'angular-sortablejs';

import { BacklogCardControllerComponent, CardMovementTypes } from './backlog-card-controller.component';
import { BacklogCardComponent } from '@app/backlog/components/backlog-container/backlog-card/backlog-card.component';
import { mockCard, mockList, mockCardBuilder } from '@app/test/data';
import { CardService } from '@app/app-services/card.service';
import { Card } from '@app/models';

describe('BacklogCardControllerComponent', () => {
  let component: BacklogCardControllerComponent;
  let fixture: ComponentFixture<BacklogCardControllerComponent>;
  let cardSvc: CardService;
  let mockEventFromSortable: { clone: { cardData: Card }; newIndex: number; oldIndex: number } = {
    clone: { cardData: null },
    newIndex: null,
    oldIndex: null,
  };
  let spy;
  const mockCardFromMockList = Object.assign({}, mockCard, { listId: mockList.id, projectId: mockList.projectId, planId: mockList.planId });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BacklogCardControllerComponent, BacklogCardComponent],
      imports: [SortablejsModule],
      providers: [
        { provide: CardService, useValue: { dragCard: {}, moveCardToListInSameBoard: jest.fn(), moveCardWithInSameList: jest.fn() } },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BacklogCardControllerComponent);
    component = fixture.componentInstance;
    cardSvc = TestBed.get(CardService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('cardMovement', () => {
    describe('START', () => {
      it('should add the card data to the event object on drag start', () => {
        const xtraCard = mockCardBuilder();
        const xtraCard2 = mockCardBuilder();
        component.cards = [xtraCard2, mockCardFromMockList, xtraCard];
        mockEventFromSortable = { oldIndex: 1, newIndex: undefined, clone: { cardData: null } };
        fixture.detectChanges();

        component.cardMovement(mockEventFromSortable, CardMovementTypes.START);
        expect(mockEventFromSortable.clone.cardData).toEqual(mockCardFromMockList);
      });
    });

    describe('ADD card', () => {
      beforeEach(() => {
        component.listInfo = { listId: mockList.id, projectId: mockList.projectId, planId: mockList.planId };
        component.cards = [];
        mockEventFromSortable.clone.cardData = mockCardBuilder();
      });

      it('should update the dragCard data', () => {
        fixture.detectChanges();

        component.cardMovement(mockEventFromSortable, CardMovementTypes.ADD);
        expect(mockEventFromSortable.clone.cardData.listId).toEqual(mockList.id);
      });

      it('should update the planId data', () => {
        fixture.detectChanges();
        component.cardMovement(mockEventFromSortable, CardMovementTypes.ADD);

        expect(mockEventFromSortable.clone.cardData.planId).toEqual(mockList.planId);
      });

      it('should update the projectId data', () => {
        fixture.detectChanges();
        component.cardMovement(mockEventFromSortable, CardMovementTypes.ADD);

        expect(mockEventFromSortable.clone.cardData.projectId).toEqual(mockList.projectId);
      });
    });

    describe('END', () => {
      beforeEach(() => {
        component.listInfo = { listId: mockList.id, projectId: mockList.projectId, planId: mockList.planId };
      });
      it('should know if the card did not move', () => {
        // The <any> type is to allow a spyon private method
        component.cards = [];
        spy = jest.spyOn(<any>component, 'dragCardEnd');
        mockEventFromSortable = { newIndex: 0, oldIndex: 0, clone: { cardData: mockCardFromMockList } };

        component.cardMovement(mockEventFromSortable, CardMovementTypes.END);
        fixture.detectChanges();

        expect(spy).not.toHaveBeenCalled();
      });

      it('should tell if the card was moved within the same list (same list)', () => {
        spy = spyOn(cardSvc, 'moveCardWithInSameList');
        component.cards = [mockCardFromMockList, mockCard];
        mockEventFromSortable = { newIndex: 1, oldIndex: 0, clone: { cardData: mockCardFromMockList } };

        component.cardMovement(mockEventFromSortable, CardMovementTypes.END);

        expect(spy).toHaveBeenCalledWith(component.cards, 1);
      });

      it('should tell if the card was moved within the same list (not same list)', () => {
        spy = spyOn(cardSvc, 'moveCardWithInSameList');
        const mockCard2 = mockCardBuilder();
        component.cards = [mockCard2, mockCard];
        mockEventFromSortable = { newIndex: 1, oldIndex: 0, clone: { cardData: mockCard2 } };

        component.cardMovement(mockEventFromSortable, CardMovementTypes.END);

        expect(spy).not.toHaveBeenCalled();
      });
    });
  });
});
