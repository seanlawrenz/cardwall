import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { BacklogContainerComponent } from './backlog-container.component';

describe('BacklogContainerComponent', () => {
  let component: BacklogContainerComponent;
  let fixture: ComponentFixture<BacklogContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BacklogContainerComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BacklogContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
