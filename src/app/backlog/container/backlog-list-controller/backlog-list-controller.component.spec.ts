import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BacklogListControllerComponent } from './backlog-list-controller.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { mockList } from '@app/test/data';

describe('BacklogListControllerComponent', () => {
  let component: BacklogListControllerComponent;
  let fixture: ComponentFixture<BacklogListControllerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BacklogListControllerComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BacklogListControllerComponent);
    component = fixture.componentInstance;
    component.lists = [mockList];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
