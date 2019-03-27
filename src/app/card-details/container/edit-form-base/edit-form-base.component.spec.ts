import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFormBaseComponent } from './edit-form-base.component';

describe('EditFormBaseComponent', () => {
  let component: EditFormBaseComponent;
  let fixture: ComponentFixture<EditFormBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditFormBaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFormBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
