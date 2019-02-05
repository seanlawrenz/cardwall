import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

import { BoardsViewComponent } from './boards-view.component';
import { mockBoard } from '@app/test/data';

describe('BoardsViewComponent', () => {
  let component: BoardsViewComponent;
  let fixture: ComponentFixture<BoardsViewComponent>;
  let text;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BoardsViewComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardsViewComponent);
    component = fixture.componentInstance;
    component.plans = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show to add existing card walls if no boards selected', () => {
    text = fixture.debugElement.query(By.css('.alert-primary'));
    expect(text.nativeElement.textContent).toContain('No Card Walls have been selected');
  });

  it('should show a warning for boards that failed', () => {
    const failedMockBoard = Object.assign({}, mockBoard, {
      erroredDuringFetching: true,
      message: 'Cannot Get Board',
      reason: 'You do not have access to this project',
    });
    component.plans = [failedMockBoard, mockBoard];
    fixture.detectChanges();
    text = fixture.debugElement.query(By.css('.alert-warning'));
    expect(text.nativeElement.textContent).toContain('Cannot Get Board');
  });
});
