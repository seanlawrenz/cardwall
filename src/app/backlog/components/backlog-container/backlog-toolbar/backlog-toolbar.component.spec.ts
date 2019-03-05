import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { BacklogToolbarComponent } from './backlog-toolbar.component';

describe('BacklogToolbarComponent', () => {
  let component: BacklogToolbarComponent;
  let fixture: ComponentFixture<BacklogToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BacklogToolbarComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BacklogToolbarComponent);
    component = fixture.componentInstance;
    component.plans = [];
    component.resources = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
