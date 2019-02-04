import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoryPointIndicatorComponent } from './story-point-indicator.component';
import { TdTooltipDirective } from '@app/shared/directives/tooltip-directive';

describe('StoryPointIndicatorComponent', () => {
  let component: StoryPointIndicatorComponent;
  let fixture: ComponentFixture<StoryPointIndicatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StoryPointIndicatorComponent, TdTooltipDirective],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoryPointIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return the correct tooltip message', () => {
    let message;
    component.storyPoints = 1;
    message = component.getStoryPointsTooltip();
    expect(message).toBe('1 Story Point');

    component.storyPoints = 10;
    message = component.getStoryPointsTooltip();
    expect(message).toBe('10 Story Points');

    component.storyPoints = undefined;
    component.isSummary = true;
    message = component.getStoryPointsTooltip();
    expect(message).toBe(`No story point estimates are present`);

    component.isSummary = false;
    message = component.getStoryPointsTooltip();
    expect(message).toBe('This card has not been given a story point estimate');
  });
});
