import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubtaskViewComponent } from './subtask-view.component';

describe('SubtaskViewComponent', () => {
  let component: SubtaskViewComponent;
  let fixture: ComponentFixture<SubtaskViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubtaskViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubtaskViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
