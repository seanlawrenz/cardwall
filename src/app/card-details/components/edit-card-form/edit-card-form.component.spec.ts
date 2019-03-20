import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCardFormComponent } from './edit-card-form.component';

describe('EditCardFormComponent', () => {
  let component: EditCardFormComponent;
  let fixture: ComponentFixture<EditCardFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCardFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCardFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
