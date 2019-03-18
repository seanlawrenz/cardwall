import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { CardDetailsDialogBaseComponent } from './card-details-dialog-base.component';
import { Store } from '@ngrx/store';

describe('CardDetailsDialogBaseComponent', () => {
  let component: CardDetailsDialogBaseComponent;
  let fixture: ComponentFixture<CardDetailsDialogBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CardDetailsDialogBaseComponent],
      providers: [{ provide: Store, useValue: { pipe: jest.fn(), select: jest.fn() } }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardDetailsDialogBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
