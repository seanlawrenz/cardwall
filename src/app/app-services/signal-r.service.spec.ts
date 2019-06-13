import { async, TestBed } from '@angular/core/testing';

import { SignalRService } from './signal-r.service';
import { ConfigService } from './config.service';
import { ConnectionState } from '@app/models';

import { mockConfigService } from '@app/test/mocks';
import { Store } from '@ngrx/store';
import { BrowserNotificationService } from './browser-notification.service';

describe('SignalRService', () => {
  let service: SignalRService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: ConfigService, useValue: mockConfigService },
        { provide: Store, useValue: { dispatch: jest.fn() } },
        { provide: BrowserNotificationService, useValue: { processNotification: jest.fn() } },
      ],
    });
  });

  it('should be created', () => {
    service = TestBed.get(SignalRService);
    expect(service).toBeTruthy();
  });

  it('should initialize the signalr connection', () => {
    service.initialize();
    async(() => {
      expect(service.connectionState).toEqual(ConnectionState.connected);
    });
  });

  describe('connecting to signalR', () => {
    it('should initialize the signalr connection', () => {
      service.initialize();
      async(() => {
        expect(service.connectionState).toEqual(ConnectionState.connected);
      });
    });

    it('should call the callback if provided', () => {
      const callback = {
        callbackTest: () => {},
      };
      const spy = spyOn(callback, 'callbackTest');
      service.initialize(callback.callbackTest);
      async(() => {
        expect(spy).toHaveBeenCalled();
      });
    });
  });

  describe('invoking functions', () => {
    it('should invoke a signalr method', () => {
      const response = service.invoke('madeUpMethod', []);
      async(() => {
        expect(response).not.toBeUndefined();
      });
    });
  });
});
