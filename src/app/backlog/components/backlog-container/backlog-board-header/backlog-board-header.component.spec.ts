import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/compiler/src/core';

import { BacklogBoardHeaderComponent } from './backlog-board-header.component';
import { ConfigService } from '@app/app-services';
import { mockBoard, mockCard, mockList } from '@app/test/data';
import { mockConfigService } from '@app/test/mocks';
import { Card, List, Plan } from '@app/models';
import { By } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { TrimTextToLimitPipe } from '@app/shared/pipes/trim-text-to-limit.pipe';

describe('BacklogBoardHeaderComponent', () => {
  const mockSub: Subscription = new Subscription();
  let component: BacklogBoardHeaderComponent;
  let fixture: ComponentFixture<BacklogBoardHeaderComponent>;
  let text;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BacklogBoardHeaderComponent, TrimTextToLimitPipe],
      providers: [
        { provide: ConfigService, useValue: mockConfigService },
        { provide: Store, useValue: { pipe: jest.fn(), select: jest.fn() } },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BacklogBoardHeaderComponent);
    component = fixture.componentInstance;
    component.expandedSub = mockSub;
    // Removing the subscription of the expand for now.
    component.ngOnInit = () => {
      component.updateSummaryData();
    };
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('updateSummaryData', () => {
    it('should update the estimateHours and storyPoints', async(() => {
      const activeMockList: List = Object.assign({}, mockList, { active: true });
      const mockCardWithHours: Card = Object.assign({}, mockCard, { planId: 123, estimatedHours: 3, storyPoints: 1 });
      const extraMockCardWithHours: Card = Object.assign({}, mockCard, { planId: 123, estimatedHours: 5, storyPoints: 3 });
      activeMockList.cards.push(mockCardWithHours, extraMockCardWithHours);
      const archiveList: List = Object.assign({}, mockList, { id: 0, cards: [mockCard, mockCardWithHours] });
      const inactiveList: List = Object.assign({}, mockList, { active: false, cards: [mockCard, extraMockCardWithHours] });
      const mockPlanWithHours: Plan = Object.assign({}, mockBoard, { id: 123, lists: [activeMockList, archiveList, inactiveList] });
      component.plan = mockPlanWithHours;

      fixture.detectChanges();

      component.updateSummaryData();

      expect(component.cardCount).toEqual(2);
      expect(component.estimatedHours).toEqual(8);
      expect(component.storyPoints).toEqual(4);
    }));

    it('should handle an empty plan', () => {
      component.plan = undefined;
      expect(() => {
        component.updateSummaryData();
      }).not.toThrowError();
    });

    it('should handle a plan with no lists', () => {
      component.plan = mockBoard;
      expect(() => {
        component.updateSummaryData();
        expect(component.cardCount).toEqual(0);
      }).not.toThrowError();
    });
  });

  describe('showing the list', () => {
    it('should show the warning if there are no lists on the plans', () => {
      component.plan = mockBoard;
      fixture.detectChanges();

      text = fixture.debugElement.query(By.css('.alert-warning'));

      expect(text.nativeElement.textContent).toContain('This Card Wall does not have any active lists defined.');
    });

    it('should show the lists', () => {
      const mockPlanWithList = Object.assign({}, mockBoard, { lists: [mockList] });
      component.plan = mockPlanWithList;
      fixture.detectChanges();

      text = fixture.debugElement.query(By.css('.alert-warning'));

      expect(text).toBeNull();
    });
  });
});
