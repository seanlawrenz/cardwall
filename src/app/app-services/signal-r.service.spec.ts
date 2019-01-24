import { TestBed } from '@angular/core/testing';

import { SignalRService } from './signal-r.service';
import { ConfigService } from './config.service';

import { mockConfigService } from '@app/test/mocks';

describe('SignalRService', () => {
  let service: SignalRService;

  it('should be created', () => {
    const fake = { config: { SignalRBasePath: 'something' } };
    service = new SignalRService(mockConfigService as ConfigService);
    expect(service).toBeTruthy();
  });
});
