import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubtasksBaseComponent } from './subtasks-base.component';

describe('SubtasksBaseComponent', () => {
  let component: SubtasksBaseComponent;
  let fixture: ComponentFixture<SubtasksBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubtasksBaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubtasksBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
