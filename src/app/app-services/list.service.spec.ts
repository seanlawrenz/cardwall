import { TestBed } from '@angular/core/testing';

import { ListService } from './list.service';
import { ConfigService } from './config.service';
import { mockConfigService } from '@app/test/mocks';

describe('ListService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [ListService, { provide: ConfigService, useValue: mockConfigService }],
    }),
  );

  it('should be created', () => {
    const service: ListService = TestBed.get(ListService);
    expect(service).toBeTruthy();
  });
});
