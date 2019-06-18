import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

import { BrowserNotificationService } from './browser-notification.service';
import { ConfigService } from './config.service';
import { AppService } from './app.service';
import { Location } from '@angular/common';
import { mockBoard, mockCard, mockResource, resourceBuilder } from '@app/test/data';
import { BrowserNotificationSettings } from '@app/models';

describe('BrowserNotificationService', () => {
  let location: Location;
  let service: BrowserNotificationService;
  let appSvc: AppService;
  let router: Router;
  let spy;
  let config: ConfigService;

  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        { provide: ConfigService, useValue: { config: { UID: mockResource.uid } } },
        { provide: AppService, useValue: { showCardDetails: jest.fn() } },
        { provide: Router, useValue: { navigate: jest.fn() } },
      ],
    }),
  );

  it('should be created', () => {
    service = TestBed.get(BrowserNotificationService);
    expect(service).toBeTruthy();
  });

  describe('editCard', () => {
    beforeEach(() => {
      location = TestBed.get(Location);
      appSvc = TestBed.get(AppService);
      service = TestBed.get(BrowserNotificationService);
      router = TestBed.get(Router);
    });
    it('should call appService if in backlog', () => {
      location.path = jest.fn(() => `/backlog?boards=${mockBoard.projectId}_${mockBoard.id}`);
      spy = jest.spyOn(appSvc, 'showCardDetails');

      service.editCard(mockCard);

      expect(spy).toHaveBeenCalledWith(mockCard);
    });
    it('should call router if in cardwall', () => {
      location.path = jest.fn(() => `/cardwall/project/${mockBoard.projectId}/board/${mockBoard.id}`);
      spy = jest.spyOn(router, 'navigate');

      service.editCard(mockCard);

      expect(spy).toHaveBeenCalledWith([`cardwall/project/${mockCard.projectId}/board/${mockCard.planId}/card/${mockCard.id}`]);
    });
  });

  describe('canReceiveNotification', () => {
    let test;
    beforeEach(() => (config = TestBed.get(ConfigService)));

    it('should return true if there is no localStorage item', () => {
      test = service['canReceiveNotification'](undefined, mockCard);
      expect(test).toBeTruthy();
    });

    describe('myItems', () => {
      it('should handle no owners', () => {
        test = service['canReceiveNotification'](BrowserNotificationSettings.myItems, mockCard);
        expect(test).toBeFalsy();
      });

      it('should return false if card is not part of the users work', () => {
        const otherResource = resourceBuilder();
        const cardThatUserIsNotOwnerOf = { ...mockCard, owners: [otherResource] };
        test = service['canReceiveNotification'](BrowserNotificationSettings.myItems, cardThatUserIsNotOwnerOf);
        expect(test).toBeFalsy();
      });

      it('should return true if card is in the user work', () => {
        const cardThatUserIsOwnerOf = { ...mockCard, owners: [mockResource] };

        test = service['canReceiveNotification'](BrowserNotificationSettings.myItems, cardThatUserIsOwnerOf);
        expect(test).toBeTruthy();
      });
    });

    describe('allItems', () => {
      it('should return true', () => {
        expect(service['canReceiveNotification'](BrowserNotificationSettings.allItems, mockCard)).toBeTruthy();
      });
    });

    describe('none', () => {
      it('should return false', () => {
        expect(service['canReceiveNotification'](BrowserNotificationSettings.none, mockCard)).toBeFalsy();
      });
    });
  });
});
