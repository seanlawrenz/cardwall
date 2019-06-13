import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { BrowserNotificationService } from './browser-notification.service';
import { ConfigService } from './config.service';
import { mockConfigService } from '@app/test/mocks';

describe('BrowserNotificationService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [{ provide: ConfigService, useValue: mockConfigService }],
    }),
  );

  it('should be created', () => {
    const service: BrowserNotificationService = TestBed.get(BrowserNotificationService);
    expect(service).toBeTruthy();
  });
});
