import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { CardwallCardsBaseComponent } from './cardwall-cards-base.component';
import { Store } from '@ngrx/store';
import { mockBoard, mockList } from '@app/test/data';

describe('CardwallCardsBaseComponent', () => {
  let component: CardwallCardsBaseComponent;
  let fixture: ComponentFixture<CardwallCardsBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CardwallCardsBaseComponent],
      providers: [{ provide: Store, useValue: { pipe: jest.fn() } }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardwallCardsBaseComponent);
    component = fixture.componentInstance;
    component.board = mockBoard;
    component.list = mockList;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
