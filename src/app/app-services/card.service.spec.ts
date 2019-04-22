import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { CardService } from './card.service';
import { SignalRService } from './signal-r.service';
import { mockCardBuilder, mockList, mockListBuilder, mockResource } from '@app/test/data';
import { CardOperationInfo, Card } from '@app/models';
import { NotificationService } from './notification.service';
import { ConfigService } from './config.service';
import { mockConfigService } from '@app/test/mocks';

describe('CardService', () => {
  let service: CardService;
  let signalR: SignalRService;
  let notificationSvc: NotificationService;
  let config: ConfigService;
  let spy;
  const mockCard = mockCardBuilder();
  const extraMockCard: Card = mockCardBuilder();
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [
        { provide: SignalRService, useValue: { invoke: jest.fn() } },
        { provide: NotificationService, useValue: { danger: jest.fn(), warning: jest.fn(), success: jest.fn() } },
        { provide: ConfigService, useValue: mockConfigService },
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

      service.moveCardWithInSameList([mockCard, extraMockCard], 0).subscribe(() => {
        expect(spy).toHaveBeenCalledWith('CardReorderRelativeTo', mockCard.projectId, mockCard.planId, mockCard.listId, mockCard.id, 0);
      });
    });

    it('should notify that there was a problem', () => {
      service = TestBed.get(CardService);
      signalR = TestBed.get(SignalRService);
      notificationSvc = TestBed.get(NotificationService);
      jest.spyOn(signalR, 'invoke').mockImplementationOnce(jest.fn(() => of({ isSuccessful: false, message: `It's not good` })));
      spy = spyOn(notificationSvc, 'danger');

      service.moveCardWithInSameList([mockCard], 0).subscribe(() => {
        expect(spy).toHaveBeenCalledWith('Problem Reordering Card', `It's not good`);
      });
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

  describe('moveCardUp', () => {
    it('should call moveCardWithInSameList', () => {
      const mockListWithMockCard = { ...mockListBuilder(), cards: [extraMockCard, mockCard] };
      spy = jest.spyOn(service, 'moveCardWithInSameList');
      jest.spyOn(signalR, 'invoke').mockImplementationOnce(jest.fn(() => of({ isSuccessful: true })));
      service.moveCardUp(mockListWithMockCard, 1);
      expect(spy).toHaveBeenCalledWith([mockCard, extraMockCard], 0);
    });
  });

  describe('assignResource', () => {
    beforeEach(() => {
      service = TestBed.get(CardService);
      signalR = TestBed.get(SignalRService);
      notificationSvc = TestBed.get(NotificationService);
    });

    it('should notify the user they do not have permission if they do not', () => {
      config = TestBed.get(ConfigService);
      config.config.CanEditTasks = false;
      spy = jest.spyOn(notificationSvc, 'warning');

      service.assignResource(mockCard, mockResource, false);

      expect(spy).toHaveBeenCalledWith('No Permissions', `You need the 'Edit Tasks' permission to assign resources.`);
    });

    it('should notify that there was an error if not successful', () => {
      config = TestBed.get(ConfigService);
      config.config.CanEditTasks = true;
      const testResponse = 'Not successful';
      signalR.invoke = jest.fn(() => of({ isSuccessful: false, message: testResponse }));
      spy = jest.spyOn(notificationSvc, 'danger');

      service.assignResource(mockCard, mockResource, false).subscribe(() => {
        expect(spy).toHaveBeenCalledWith('Could not Assign Resource', testResponse);
      });
    });

    it('should notify that the resource was successfully added', () => {
      config = TestBed.get(ConfigService);
      config.config.CanEditTasks = true;
      const mockCardWithResource = { ...mockCard, owners: [mockResource] };
      signalR.invoke = jest.fn(() => of({ isSuccessful: true, item: mockCardWithResource }));
      spy = jest.spyOn(notificationSvc, 'success');

      service.assignResource(mockCard, mockResource, false).subscribe(() => {
        expect(spy).toHaveBeenCalledWith(`${mockResource.name} added`, `${mockResource.name} added to card ${mockCardWithResource.name}`);
      });
    });
  });
});
