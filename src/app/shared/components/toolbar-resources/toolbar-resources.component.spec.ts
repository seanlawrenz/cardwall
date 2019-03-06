import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { ToolbarResourcesComponent } from './toolbar-resources.component';
import { ConfigService } from '@app/app-services';
import { mockConfigService } from '@app/test/mocks';
import { mockResource, mockBoardBuilder, mockListBuilder, mockCardBuilder, resourceBuilder } from '@app/test/data';
import { Plan, List, Card } from '@app/models';

describe('ToolbarResourcesComponent', () => {
  let component: ToolbarResourcesComponent;
  let fixture: ComponentFixture<ToolbarResourcesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ToolbarResourcesComponent],
      providers: [{ provide: ConfigService, useValue: mockConfigService }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarResourcesComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the totals of a resource', () => {
    component.resource = mockResource;
    const mockResource2 = resourceBuilder();
    const mockPlan1: Plan = mockBoardBuilder();
    const mockPlan2 = mockBoardBuilder();
    const mockList: List = mockListBuilder();
    const mockCard: Card = mockCardBuilder();

    const mockCardThatShouldNotCount = { ...mockCard, listId: 0, owners: [mockResource] };
    const mockCardThatShouldNotCount2 = { ...mockCard, owners: [mockResource] };
    const mockCardThatShouldCount1 = { ...mockCard, owners: [mockResource], storyPoints: 2, estimatedHours: 0 };
    const mockCardThatShouldCount2 = { ...mockCard, owners: [mockResource], storyPoints: 0, estimatedHours: 0 };
    const mockCardThatShouldCount3 = { ...mockCard, owners: [mockResource, mockResource2], storyPoints: 0, estimatedHours: 1 };

    const mockList1 = { ...mockList, planId: mockPlan1.id, id: 0, cards: [mockCardThatShouldNotCount], active: true };
    const mockList2 = { ...mockList, planId: mockPlan1.id, cards: [mockCardThatShouldCount1], active: true };
    const mockList3 = { ...mockList, planId: mockPlan2.id, cards: [mockCardThatShouldCount2, mockCardThatShouldCount3], active: true };
    const mockList4 = { ...mockList, planId: mockPlan1.id, cards: [mockCardThatShouldNotCount2], active: false };

    mockPlan1.lists = [mockList1, mockList2];
    mockPlan2.lists = [mockList3, mockList4];

    component.plans = [mockPlan1, mockPlan2];

    fixture.detectChanges();

    expect(component.totalCards).toBe(3);
    expect(component.totalStoryPoints).toBe(2);
    expect(component.totalEstimatedHours).toBe(0.5);
  });

  it('should ignore the totals of different resource', () => {
    const mockResource2 = resourceBuilder();
    component.resource = resourceBuilder();
    const mockPlan1: Plan = mockBoardBuilder();
    const mockPlan2 = mockBoardBuilder();
    const mockList: List = mockListBuilder();
    const mockCard: Card = mockCardBuilder();

    const mockCardThatShouldNotCount = { ...mockCard, listId: 0, owners: [mockResource] };
    const mockCardThatShouldNotCount2 = { ...mockCard, owners: [mockResource] };
    const mockCardThatShouldCount1 = { ...mockCard, owners: [mockResource], storyPoints: 2, estimatedHours: 0 };
    const mockCardThatShouldCount2 = { ...mockCard, owners: [mockResource], storyPoints: 0, estimatedHours: 0 };
    const mockCardThatShouldCount3 = { ...mockCard, owners: [mockResource, mockResource2], storyPoints: 0, estimatedHours: 1 };

    const mockList1 = { ...mockList, planId: mockPlan1.id, id: 0, cards: [mockCardThatShouldNotCount], active: true };
    const mockList2 = { ...mockList, planId: mockPlan1.id, cards: [mockCardThatShouldCount1], active: true };
    const mockList3 = { ...mockList, planId: mockPlan2.id, cards: [mockCardThatShouldCount2, mockCardThatShouldCount3], active: true };
    const mockList4 = { ...mockList, planId: mockPlan1.id, cards: [mockCardThatShouldNotCount2], active: false };

    mockPlan1.lists = [mockList1, mockList2];
    mockPlan2.lists = [mockList3, mockList4];

    component.plans = [mockPlan1, mockPlan2];

    fixture.detectChanges();

    expect(component.totalCards).toBe(0);
    expect(component.totalStoryPoints).toBe(0);
    expect(component.totalEstimatedHours).toBe(0);
  });
});
