import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubtasksViewComponent } from './subtasks-view.component';

describe('SubtasksViewComponent', () => {
  let component: SubtasksViewComponent;
  let fixture: ComponentFixture<SubtasksViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubtasksViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubtasksViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
