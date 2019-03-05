import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { BacklogToolbarContainerComponent } from './backlog-toolbar-container.component';
import { Store } from '@ngrx/store';

import { resourceBuilder, mockBoardBuilder } from '@app/test/data';

const mockResource1 = resourceBuilder();
const mockResource2 = resourceBuilder();
const mockResource3 = resourceBuilder();
const mockResource4 = resourceBuilder();
const mockResource5 = resourceBuilder();
const mockResource6 = resourceBuilder();

const totalResources = [mockResource1, mockResource2, mockResource3, mockResource4, mockResource5, mockResource6];

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

  it('should get all the resources from the plans', () => {
    const mockPlan1 = mockBoardBuilder();
    const mockPlan2 = mockBoardBuilder();
    const mockPlan3 = mockBoardBuilder();

    mockPlan1.resources = [mockResource1, mockResource2, mockResource3, mockResource4];
    mockPlan2.resources = [mockResource1, mockResource3, mockResource4];
    mockPlan3.resources = [mockResource2, mockResource4, mockResource5, mockResource6];
    component.plans = [mockPlan1, mockPlan2, mockPlan3];

    fixture.detectChanges();

    expect(component.resources).toEqual(totalResources);
  });

  it('should handle there being no plans', () => {
    component.plans = [];
    fixture.detectChanges();
    expect(() => component['getResourcesFromPlans']).not.toThrowError();
  });
});
