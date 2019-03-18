import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Store } from '@ngrx/store';

import { CardDetailsBaseComponent } from './card-details-base.component';

describe('CardDetailsBaseComponent', () => {
  let component: CardDetailsBaseComponent;
  let fixture: ComponentFixture<CardDetailsBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CardDetailsBaseComponent],
      providers: [{ provide: Store, useValue: { pipe: jest.fn() } }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardDetailsBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
