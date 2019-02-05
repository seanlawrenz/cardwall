import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/compiler/src/core';

import { BacklogBoardHeaderComponent } from './backlog-board-header.component';
import { ConfigService } from '@app/app-services';
import { mockBoard, mockCard, mockList } from '@app/test/data';
import { mockConfigService } from '@app/test/mocks';
import { Card, List, Plan } from '@app/models';

describe('BacklogBoardHeaderComponent', () => {
  let component: BacklogBoardHeaderComponent;
  let fixture: ComponentFixture<BacklogBoardHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BacklogBoardHeaderComponent],
      providers: [{ provide: ConfigService, useValue: mockConfigService }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BacklogBoardHeaderComponent);
    component = fixture.componentInstance;
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
});
