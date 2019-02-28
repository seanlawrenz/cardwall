import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstimatedHoursComponent } from './estimated-hours.component';
import { TdTooltipDirective } from '@app/shared/directives/tooltip-directive';

describe('EstimatedHoursComponent', () => {
  let component: EstimatedHoursComponent;
  let fixture: ComponentFixture<EstimatedHoursComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EstimatedHoursComponent, TdTooltipDirective],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstimatedHoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return a tooltip message', () => {
    component.value = null;
    expect(component.buildTooltip()).toBe(`0.00 Estimated Hours`);

    component.value = 1;
    expect(component.buildTooltip()).toBe(`1.00 Estimated Hour`);

    component.value = 3;
    expect(component.buildTooltip()).toBe(`3.00 Estimated Hours`);
  });
});
