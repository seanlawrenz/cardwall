import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { CardwallToolbarContainerComponent } from './cardwall-toolbar-container.component';
import { mockBoard, mockResource } from '@app/test/data';
import { Store } from '@ngrx/store';

describe('CardwallToolbarContainerComponent', () => {
  let component: CardwallToolbarContainerComponent;
  let fixture: ComponentFixture<CardwallToolbarContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CardwallToolbarContainerComponent],
      providers: [{ provide: Store, useValue: { dispatch: jest.fn(), pipe: jest.fn() } }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardwallToolbarContainerComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
