import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PopoverModule } from 'ngx-bootstrap/popover';

import { WipIndicatorComponent } from './wip-indicator.component';
import { mockList, mockCard } from '@app/test/data';
import { List, ListLimit } from '@app/models';

describe('WipIndicatorComponent', () => {
  let component: WipIndicatorComponent;
  let fixture: ComponentFixture<WipIndicatorComponent>;
  let testList: List;
  let limit: ListLimit;
  let expected;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WipIndicatorComponent],
      imports: [PopoverModule.forRoot()],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WipIndicatorComponent);
    component = fixture.componentInstance;
    component.list = mockList;
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

  describe('isWIPLimitViolated', () => {
    it('should return false if no limits', () => {
      testList = { ...mockList, limits: [] };
      component.list = testList;

      fixture.detectChanges();
      expected = component.isWIPLimitViolated();

      expect(expected).toBeFalsy();
    });

    it('should return true if min is violated', () => {
      limit = {
        minValue: 2,
        maxValue: 5,
        statusID: 123,
        projectID: mockList.projectID,
        planID: mockList.planID,
      };
      testList = { ...mockList, limits: [limit], cards: [] };
      component.list = testList;

      fixture.detectChanges();
      expected = component.isWIPLimitViolated();

      expect(expected).toBeTruthy();
    });

    it('should return true if max is violated', () => {
      limit = {
        minValue: 0,
        maxValue: 0,
        statusID: 123,
        projectID: mockList.projectID,
        planID: mockList.planID,
      };
      testList = { ...mockList, limits: [limit], cards: [mockCard] };
      component.list = testList;

      fixture.detectChanges();
      expected = component.isWIPLimitViolated();

      expect(expected).toBeTruthy();
    });

    it('should handel a min or max to be null', () => {
      limit = {
        minValue: null,
        maxValue: 1,
        statusID: 123,
        projectID: mockList.projectID,
        planID: mockList.planID,
      };
      testList = { ...mockList, limits: [limit], cards: [mockCard] };
      component.list = testList;

      fixture.detectChanges();
      expected = component.isWIPLimitViolated();

      expect(() => {
        expect(expected).toBeFalsy();
      }).not.toThrowError();
    });

    it('should return false if not violated and has limit', () => {
      limit = {
        minValue: 1,
        maxValue: 3,
        statusID: 123,
        projectID: mockList.projectID,
        planID: mockList.planID,
      };

      testList = { ...mockList, limits: [limit], cards: [mockCard, mockCard, mockCard] };

      fixture.detectChanges();
      expected = component.isWIPLimitViolated();

      expect(expected).toBeFalsy();
    });
  });

  describe('buildWipToolTip', () => {
    it(`should return 'A Work In Progress (WIP) Limit has not been configured for this list.' if no limit`, () => {
      component.isLimit = false;

      expected = component.buildWipToolTip(undefined);

      expect(expected).toBe('A Work In Progress (WIP) Limit has not been configured for this list.');
    });

    it('should return a message for a violated limit and a min', () => {
      limit = {
        minValue: 5,
        maxValue: null,
        statusID: 123,
        projectID: mockList.projectID,
        planID: mockList.planID,
      };
      testList = { ...mockList, limits: [limit], cards: [mockCard, mockCard] };
      component.list = testList;
      fixture.detectChanges();
      // tslint:disable-next-line:max-line-length
      expected = `The Work In Progress (WIP) limit for this list has been violated. The list contains 2 cards, but has been configured with a minimum WIP limit of 5.`;

      const test = component.buildWipToolTip(component.list.limits[0]);

      expect(test).toEqual(expected);
    });

    it('should return a message for a violated limit and a max', () => {
      limit = {
        minValue: null,
        maxValue: 1,
        statusID: 123,
        projectID: mockList.projectID,
        planID: mockList.planID,
      };
      testList = { ...mockList, limits: [limit], cards: [mockCard, mockCard] };
      component.list = testList;
      fixture.detectChanges();
      // tslint:disable-next-line:max-line-length
      expected = `The Work In Progress (WIP) limit for this list has been violated. The list contains 2 cards, but has been configured with a maximum WIP limit of 1.`;

      const test = component.buildWipToolTip(component.list.limits[0]);

      expect(test).toEqual(expected);
    });

    it('should return a message for a violated limit and min and max', () => {
      limit = {
        minValue: 3,
        maxValue: 5,
        statusID: 123,
        projectID: mockList.projectID,
        planID: mockList.planID,
      };
      testList = { ...mockList, limits: [limit], cards: [mockCard, mockCard] };
      component.list = testList;
      fixture.detectChanges();
      // tslint:disable-next-line:max-line-length
      expected = `The Work In Progress (WIP) limit for this list has been violated. The list contains 2 cards, but has been configured with a minimum WIP limit of 3 and a maximum WIP limit of 5.`;

      const test = component.buildWipToolTip(component.list.limits[0]);

      expect(test).toEqual(expected);
    });

    it('should return a message for a non-violated limit', () => {
      limit = {
        minValue: 0,
        maxValue: 5,
        statusID: 123,
        projectID: mockList.projectID,
        planID: mockList.planID,
      };
      testList = { ...mockList, limits: [limit], cards: [mockCard, mockCard] };
      component.list = testList;
      fixture.detectChanges();
      // tslint:disable-next-line:max-line-length
      expected = `This list contains 2 cards, and and has been configured with a minimum WIP limit of 0 and a maximum WIP limit of 5.`;

      const test = component.buildWipToolTip(component.list.limits[0]);

      expect(test).toEqual(expected);
    });
  });
});
