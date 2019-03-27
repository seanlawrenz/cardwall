import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { NO_ERRORS_SCHEMA } from '@angular/compiler/src/core';

import { CopyMoveCardComponent } from './copy-move-card.component';

describe('CopyMoveCardComponent', () => {
  let component: CopyMoveCardComponent;
  let fixture: ComponentFixture<CopyMoveCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CopyMoveCardComponent],
      providers: [{ provide: Store, useValue: { dispatch: jest.fn() } }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CopyMoveCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
