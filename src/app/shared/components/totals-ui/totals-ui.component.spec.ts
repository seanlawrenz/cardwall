import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalsUiComponent } from './totals-ui.component';
import { mockBoardBuilder, mockListBuilder, mockCardBuilder } from '@app/test/data';
import { Card, List, Plan } from '@app/models';
import { TrimTextToLimitPipe } from '@app/shared/pipes/trim-text-to-limit.pipe';
import { EstimatedHoursComponent } from '../estimated-hours/estimated-hours.component';
import { StoryPointIndicatorComponent } from '../story-point-indicator/story-point-indicator.component';
import { TdTooltipDirective } from '@app/shared/directives/tooltip-directive';

describe('TotalsUiComponent', () => {
  let component: TotalsUiComponent;
  let fixture: ComponentFixture<TotalsUiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TotalsUiComponent, TrimTextToLimitPipe, EstimatedHoursComponent, StoryPointIndicatorComponent, TdTooltipDirective],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalsUiComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get totals from plans', () => {
    const mockPlan: Plan = mockBoardBuilder();
    const mockList: List = mockListBuilder();
    const mockCard: Card = mockCardBuilder();

    const mockCard1 = { ...mockCard, estimatedHours: 0, storyPoints: 0 };
    const mockCard2 = { ...mockCard, estimatedHours: 1, storyPoints: 1 };
    const mockCard3 = { ...mockCard, estimatedHours: 0, storyPoints: 1 };
    const mockCardToNotCount = { ...mockCard, estimatedHours: 10, storyPoints: 1000 };
    const mockCardToNotCount2 = { ...mockCard, estimatedHours: 100, storyPoints: 1000 };

    const mockListToNotCount = { ...mockList, id: 0, active: true, cards: [mockCardToNotCount] };
    const mockListToNotCount2 = { ...mockList, active: false, cards: [mockCardToNotCount2] };
    const mockList1 = { ...mockList, active: true, cards: [mockCard1] };
    const mockList2 = { ...mockList, active: true, cards: [mockCard2, mockCard3] };

    mockPlan.lists = [mockListToNotCount, mockListToNotCount2, mockList1, mockList2];
    component.plan = mockPlan;

    fixture.detectChanges();

    expect(component.totalCards).toBe(3);
    expect(component.totalHours).toBe(1);
    expect(component.totalStoryPoints).toBe(2);
  });
});
