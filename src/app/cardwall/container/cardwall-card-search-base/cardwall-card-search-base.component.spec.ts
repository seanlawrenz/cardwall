import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { CardwallCardSearchBaseComponent } from './cardwall-card-search-base.component';
import { mockBoard } from '@app/test/data';

describe('CardwallCardSearchBaseComponent', () => {
  let component: CardwallCardSearchBaseComponent;
  let fixture: ComponentFixture<CardwallCardSearchBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CardwallCardSearchBaseComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardwallCardSearchBaseComponent);
    component = fixture.componentInstance;
    component.board = mockBoard;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
