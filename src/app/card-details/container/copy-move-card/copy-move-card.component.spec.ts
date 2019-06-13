import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { NO_ERRORS_SCHEMA } from '@angular/compiler/src/core';

import { CopyMoveCardComponent } from './copy-move-card.component';
import { ConfigService, SignalRService } from '@app/app-services';
import { mockConfigService } from '@app/test/mocks';

describe('CopyMoveCardComponent', () => {
  let component: CopyMoveCardComponent;
  let fixture: ComponentFixture<CopyMoveCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CopyMoveCardComponent],
      providers: [
        { provide: Store, useValue: { dispatch: jest.fn() } },
        { provide: ConfigService, useValue: mockConfigService },
        { provide: SignalRService, useValue: { invoke: jest.fn() } },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CopyMoveCardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
