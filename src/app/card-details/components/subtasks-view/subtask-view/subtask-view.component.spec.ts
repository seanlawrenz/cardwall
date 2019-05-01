import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubtaskViewComponent } from './subtask-view.component';
import { SharedModule } from '@app/shared/shared.module';
import { mockSubtask } from '@app/test/data';

describe('SubtaskViewComponent', () => {
  let component: SubtaskViewComponent;
  let fixture: ComponentFixture<SubtaskViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SubtaskViewComponent],
      imports: [SharedModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubtaskViewComponent);
    component = fixture.componentInstance;
    component.subtask = mockSubtask;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
