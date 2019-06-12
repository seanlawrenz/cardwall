import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CardwallResourcesViewComponent } from './cardwall-resources-view.component';
import { Store } from '@ngrx/store';

describe('CardwallResourcesViewComponent', () => {
  let component: CardwallResourcesViewComponent;
  let fixture: ComponentFixture<CardwallResourcesViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [CardwallResourcesViewComponent],
      providers: [{ provide: Store, useValue: { select: jest.fn(() => ({ pipe: jest.fn(() => ({ subscribe: jest.fn() })) })) } }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardwallResourcesViewComponent);
    component = fixture.componentInstance;
    component.resources = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
