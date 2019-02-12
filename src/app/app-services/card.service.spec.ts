import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { CardService } from './card.service';
import { SignalRService } from './signal-r.service';
import { mockBoardBuilder } from '@app/test/data';
import { CardOperationInfo, Card } from '@app/models';
import { NotificationService } from './notification.service';

describe('CardService', () => {
  let service: CardService;
  let signalR: SignalRService;
  let notificationSvc: NotificationService;
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

  it('should move a card within the same list', () => {
    service = TestBed.get(CardService);
    signalR = TestBed.get(SignalRService);
    const mockCard: Card = mockBoardBuilder();
    const cardOperationOrder: CardOperationInfo = { card: mockCard, orders: [{ cardID: mockCard.id, order: 1 }] };
    service.dragCard = mockCard;
    const spy = jest.spyOn(signalR, 'invoke').mockImplementationOnce(jest.fn(() => of({ isSuccessful: true, item: cardOperationOrder })));

    service.moveCardWithInSameList([mockCard], 0);
    expect(spy).toHaveBeenCalledWith('CardReorderRelativeTo', mockCard.projectId, mockCard.planId, mockCard.listId, mockCard.id, 0);
  });

  it('should notify that there was a problem', () => {
    service = TestBed.get(CardService);
    signalR = TestBed.get(SignalRService);
    notificationSvc = TestBed.get(NotificationService);
    const mockCard = mockBoardBuilder();
    service.dragCard = mockCard;
    jest.spyOn(signalR, 'invoke').mockImplementationOnce(jest.fn(() => of({ isSuccessful: false, message: `It's not good` })));
    const spy = spyOn(notificationSvc, 'danger');

    service.moveCardWithInSameList([mockCard], 0);
    expect(spy).toHaveBeenCalledWith('Problem Reordering Card', `It's not good`);
  });
});
