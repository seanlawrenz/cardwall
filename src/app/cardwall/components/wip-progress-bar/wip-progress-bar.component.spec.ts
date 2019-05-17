import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WipProgressBarComponent } from './wip-progress-bar.component';
import { mockList, mockCard } from '@app/test/data';

describe('WipProgressBarComponent', () => {
  let component: WipProgressBarComponent;
  let fixture: ComponentFixture<WipProgressBarComponent>;
  let testList;
  let limit;
  let progressValue;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WipProgressBarComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WipProgressBarComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should handle a list with an undefined limit', () => {
      testList = { ...mockList, limits: null };
      component.list = testList;

      expect(() => {
        fixture.detectChanges();
      }).not.toThrowError();

      expect(component.isLimit).toBeFalsy();
    });

    it('should set isLimit to false if no limits', () => {
      testList = { ...mockList, limits: [] };
      component.list = testList;

      fixture.detectChanges();

      expect(component.isLimit).toBeFalsy();
    });

    it('should set isLimit to true if limits', () => {
      limit = {
        minValue: 0,
        maxValue: 5,
        statusID: 123,
        projectID: mockList.projectID,
        planID: mockList.planID,
      };
      testList = { ...mockList, limits: [limit] };
      component.list = testList;

      fixture.detectChanges();

      expect(component.isLimit).toBeTruthy();
    });
  });

  describe('getProgressValue', () => {
    it('should return if no limit on list', () => {
      testList = { ...mockList, limits: [] };
      component.list = testList;

      fixture.detectChanges();
      progressValue = component.getProgressValue();

      expect(progressValue).toBeUndefined();
    });

    it('should return 100 if min is 0 and no max', () => {
      limit = {
        minValue: 0,
        maxValue: undefined,
        statusID: 124,
        projectID: mockList.projectID,
        planID: mockList.planID,
      };
      testList = { ...mockList, limits: [limit] };
      component.list = testList;

      fixture.detectChanges();
      progressValue = component.getProgressValue();

      expect(progressValue).toBe(100);
    });

    it('should return a divisible of the minValue and the number of cards on the list', () => {
      limit = {
        minValue: 4,
        maxValue: undefined,
        statusID: 124,
        projectID: mockList.projectID,
        planID: mockList.planID,
      };
      testList = { ...mockList, limits: [limit], cards: [mockCard, mockCard] };
      component.list = testList;

      fixture.detectChanges();
      progressValue = component.getProgressValue();

      expect(progressValue).toBe(50);
    });

    it('should return 100 if max 0', () => {
      limit = {
        minValue: undefined,
        maxValue: 0,
        statusID: 124,
        projectID: mockList.projectID,
        planID: mockList.planID,
      };
      testList = { ...mockList, limits: [limit], cards: [mockCard] };
      component.list = testList;

      fixture.detectChanges();
      progressValue = component.getProgressValue();

      expect(progressValue).toBe(100);
    });

    it('should return a divisible of the maxValue and the number of cards on the list', () => {
      limit = {
        minValue: 0,
        maxValue: 4,
        statusID: 124,
        projectID: mockList.projectID,
        planID: mockList.planID,
      };
      testList = { ...mockList, limits: [limit], cards: [mockCard, mockCard] };
      component.list = testList;

      fixture.detectChanges();
      progressValue = component.getProgressValue();

      expect(progressValue).toBe(50);
    });
  });
});
