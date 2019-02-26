import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubtasksIconComponent } from './subtasks-icon.component';
import { mockCard } from '@app/test/data';

describe('SubtasksIconComponent', () => {
  let component: SubtasksIconComponent;
  let fixture: ComponentFixture<SubtasksIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SubtasksIconComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubtasksIconComponent);
    component = fixture.componentInstance;
    component.card = mockCard;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
