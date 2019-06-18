import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

import { BrowserNotificationService } from './browser-notification.service';
import { ConfigService } from './config.service';
import { mockConfigService } from '@app/test/mocks';
import { AppService } from './app.service';
import { Location } from '@angular/common';
import { mockBoard, mockCard } from '@app/test/data';

describe('BrowserNotificationService', () => {
  let location: Location;
  let service: BrowserNotificationService;
  let appSvc: AppService;
  let router: Router;
  let spy;
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        { provide: ConfigService, useValue: mockConfigService },
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
});
