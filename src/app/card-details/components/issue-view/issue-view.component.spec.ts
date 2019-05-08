import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/compiler/src/core';

import { IssueViewComponent } from './issue-view.component';
import { ConfigService, NotificationService } from '@app/app-services';
import { mockConfigService } from '@app/test/mocks';
import { mockIssue, mockCard } from '@app/test/data';
import { ErrorFromSignalR } from '@app/models';

describe('IssueViewComponent', () => {
  let component: IssueViewComponent;
  let fixture: ComponentFixture<IssueViewComponent>;
  let spy;
  let notify: NotificationService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IssueViewComponent],
      providers: [
        { provide: ConfigService, useValue: mockConfigService },
        { provide: NotificationService, useValue: { danger: jest.fn() } },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueViewComponent);
    component = fixture.componentInstance;
    component.issues = [mockIssue];
    component.card = mockCard;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnIt', () => {
    beforeEach(() => (notify = TestBed.get(NotificationService)));

    it('should call notify if there was an issue fetching issues', () => {
      spy = jest.spyOn(notify, 'danger');
      const errorFromHigherComponent: ErrorFromSignalR = { message: 'Error', reason: 'Big errors' };
      component.error = errorFromHigherComponent;

      fixture.detectChanges();

      expect(spy).toHaveBeenCalledWith(errorFromHigherComponent.message, errorFromHigherComponent.reason);
    });
  });
});
