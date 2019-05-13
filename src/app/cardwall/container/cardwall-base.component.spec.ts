import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { CardwallBaseComponent } from './cardwall-base.component';
import { Store } from '@ngrx/store';

describe('CardwallBaseComponent', () => {
  let component: CardwallBaseComponent;
  let fixture: ComponentFixture<CardwallBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CardwallBaseComponent],
      imports: [RouterTestingModule],
      providers: [{ provide: Store, useValue: { dispatch: jest.fn(), select: jest.fn() } }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardwallBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
