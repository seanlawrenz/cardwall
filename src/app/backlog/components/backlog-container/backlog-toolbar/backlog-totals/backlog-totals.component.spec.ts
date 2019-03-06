import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BacklogTotalsComponent } from './backlog-totals.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('BacklogTotalsComponent', () => {
  let component: BacklogTotalsComponent;
  let fixture: ComponentFixture<BacklogTotalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BacklogTotalsComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BacklogTotalsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate totals', () => {
    // fixture.detectChanges();
  });
});
