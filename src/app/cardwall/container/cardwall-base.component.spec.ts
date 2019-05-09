import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardwallBaseComponent } from './cardwall-base.component';
import { Store } from '@ngrx/store';

describe('CardwallBaseComponent', () => {
  let component: CardwallBaseComponent;
  let fixture: ComponentFixture<CardwallBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CardwallBaseComponent],
      providers: [{ provide: Store, useValue: { dispatch: jest.fn() } }],
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
