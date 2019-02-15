import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { CardService } from './card.service';
import { SignalRService } from './signal-r.service';
import { mockBoardBuilder, mockCardBuilder, mockList } from '@app/test/data';
import { CardOperationInfo, Card } from '@app/models';
import { NotificationService } from './notification.service';

describe('CardService', () => {
  let service: CardService;
  let signalR: SignalRService;
  let notificationSvc: NotificationService;
  let spy;
  const mockCard = mockCardBuilder();
  const extraMockCard: Card = mockCardBuilder();
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [
        { provide: SignalRService, useValue: { invoke: jest.fn() } },
        { provide: NotificationService, useValue: { danger: jest.fn() } },
      ],
    }),
  );

  it('should be created', () => {
    service = TestBed.get(CardService);
    expect(service).toBeTruthy();
  });

  describe('moveCardWithInSameList', () => {
    it('should move a card within the same list', () => {
      service = TestBed.get(CardService);
      signalR = TestBed.get(SignalRService);
      const cardOperationOrder: CardOperationInfo = { card: mockCard, orders: [{ cardID: mockCard.id, order: 1 }] };
      spy = jest.spyOn(signalR, 'invoke').mockImplementationOnce(jest.fn(() => of({ isSuccessful: true, item: cardOperationOrder })));

      service.moveCardWithInSameList([mockCard, extraMockCard], 0);
      expect(spy).toHaveBeenCalledWith('CardReorderRelativeTo', mockCard.projectId, mockCard.planId, mockCard.listId, mockCard.id, 0);
    });

    it('should notify that there was a problem', () => {
      service = TestBed.get(CardService);
      signalR = TestBed.get(SignalRService);
      notificationSvc = TestBed.get(NotificationService);
      jest.spyOn(signalR, 'invoke').mockImplementationOnce(jest.fn(() => of({ isSuccessful: false, message: `It's not good` })));
      spy = spyOn(notificationSvc, 'danger');

      service.moveCardWithInSameList([mockCard], 0);
      expect(spy).toHaveBeenCalledWith('Problem Reordering Card', `It's not good`);
    });
  });

  describe('moveCardToListInSameBoard', () => {
    it('should call signalR CardMoveWithInPlan', done => {
      service = TestBed.get(CardService);
      signalR = TestBed.get(SignalRService);
      spy = jest.spyOn(signalR, 'invoke').mockImplementationOnce(jest.fn(() => of({ isSuccessful: true })));

      service.moveCardToListInSameBoard([], mockCard, mockList.id, 0).subscribe(() => {
        expect(spy).toHaveBeenCalledWith(
          'CardMoveWithinPlan',
          mockCard.projectId,
          mockCard.planId,
          mockList.id,
          mockCard.listId,
          mockCard.id,
          0,
          false,
        );
        done();
      });
    });

    it('should notify that there was a problem', done => {
      service = TestBed.get(CardService);
      signalR = TestBed.get(SignalRService);
      notificationSvc = TestBed.get(NotificationService);
      jest.spyOn(signalR, 'invoke').mockImplementationOnce(jest.fn(() => of({ isSuccessful: false, reason: `I don't need a reason` })));
      spy = spyOn(notificationSvc, 'danger');

      service.moveCardToListInSameBoard([], mockCard, mockList.id, 0).subscribe(() => {
        expect(spy).toHaveBeenCalled();
        done();
      });
    });
  });
});
