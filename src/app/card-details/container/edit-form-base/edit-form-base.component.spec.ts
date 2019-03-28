import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFormBaseComponent } from './edit-form-base.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Store } from '@ngrx/store';

describe('EditFormBaseComponent', () => {
  let component: EditFormBaseComponent;
  let fixture: ComponentFixture<EditFormBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditFormBaseComponent],
      providers: [{ provide: Store, useValue: { dispatch: jest.fn() } }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFormBaseComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
