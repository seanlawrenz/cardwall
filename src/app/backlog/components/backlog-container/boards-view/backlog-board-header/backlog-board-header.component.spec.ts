import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/compiler/src/core';

import { BacklogBoardHeaderComponent } from './backlog-board-header.component';
import { mockBoard } from '@app/test/data';

describe('BacklogBoardHeaderComponent', () => {
  let component: BacklogBoardHeaderComponent;
  let fixture: ComponentFixture<BacklogBoardHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BacklogBoardHeaderComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BacklogBoardHeaderComponent);
    component = fixture.componentInstance;
    component.plan = mockBoard;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
