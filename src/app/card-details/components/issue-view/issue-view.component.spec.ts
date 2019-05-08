import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/compiler/src/core';

import { IssueViewComponent } from './issue-view.component';
import { ConfigService } from '@app/app-services';
import { mockConfigService } from '@app/test/mocks';
import { mockIssue, mockCard } from '@app/test/data';

describe('IssueViewComponent', () => {
  let component: IssueViewComponent;
  let fixture: ComponentFixture<IssueViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IssueViewComponent],
      providers: [{ provide: ConfigService, useValue: mockConfigService }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueViewComponent);
    component = fixture.componentInstance;
    component.issues = [mockIssue];
    component.card = mockCard;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
