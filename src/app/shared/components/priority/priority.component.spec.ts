import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PriorityComponent } from './priority.component';
import { TdTooltipDirective } from '@app/shared/directives/tooltip-directive';

describe('PriorityComponent', () => {
  let component: PriorityComponent;
  let fixture: ComponentFixture<PriorityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PriorityComponent, TdTooltipDirective],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PriorityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
