import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { BacklogToolbarContainerComponent } from './backlog-toolbar-container.component';
import { Store } from '@ngrx/store';

import { mockBoardBuilder } from '@app/test/data';

describe('BacklogToolbarContainerComponent', () => {
  let component: BacklogToolbarContainerComponent;
  let fixture: ComponentFixture<BacklogToolbarContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BacklogToolbarContainerComponent],
      providers: [{ provide: Store, useValue: { pipe: jest.fn(), select: jest.fn() } }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BacklogToolbarContainerComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle there being no plans', () => {
    component.plans = [];
    fixture.detectChanges();
    expect(() => component['getResourcesFromPlans']).not.toThrowError();
  });
});
