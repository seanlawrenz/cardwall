import { TestBed } from '@angular/core/testing';

import { AppService } from './app.service';
import { Store } from '@ngrx/store';

describe('AppService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [{ provide: Store, useValue: { select: jest.fn(() => ({ pipe: jest.fn(() => ({ subscribe: jest.fn() })) })) } }],
    }),
  );

  it('should be created', () => {
    const service: AppService = TestBed.get(AppService);
    expect(service).toBeTruthy();
  });
});
