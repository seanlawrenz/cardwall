import { async } from '@angular/core/testing';

import { SignalRService } from './signal-r.service';
import { ConfigService } from './config.service';
import { ConnectionState } from '@app/models';

import { mockConfigService } from '@app/test/mocks';

describe('SignalRService', () => {
  let service: SignalRService;

  it('should be created', () => {
    service = new SignalRService(mockConfigService as ConfigService);
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
