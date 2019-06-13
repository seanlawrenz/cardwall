import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalsViewComponent } from './totals-view.component';
import { SharedModule } from '@app/shared/shared.module';
import { mockList, mockCard } from '@app/test/data';
import { Card } from '@app/models';

describe('TotalsViewComponent', () => {
  let component: TotalsViewComponent;
  let fixture: ComponentFixture<TotalsViewComponent>;
  let test;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TotalsViewComponent],
      imports: [SharedModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalsViewComponent);
    component = fixture.componentInstance;
    component.lists = [mockList];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('getTotalListHours', () => {
    it('should return 0 if 0 cards', () => {
      const listWithNoCards = { ...mockList, cards: [] };
      test = component.getTotalListHours(listWithNoCards);
      expect(test).toEqual(0);
    });

    it('should return the total amount of hours on the cards', () => {
      const cardWith10Hours: Card = { ...mockCard, estimatedHours: 10 };
      const cardWith2Hours: Card = { ...mockCard, estimatedHours: 2 };
      const cardWith3Hours: Card = { ...mockCard, estimatedHours: 3 };
      const listWithCards = { ...mockList, cards: [cardWith10Hours, cardWith2Hours, cardWith3Hours] };
      test = component.getTotalListHours(listWithCards);
      expect(test).toEqual(15);
    });
  });

  describe('getTotalStoryPoints', () => {
    it('should return 0 if 0 cards', () => {
      const listWithNoCards = { ...mockList, cards: [] };
      test = component.getTotalStoryPoints(listWithNoCards);
      expect(test).toEqual(0);
    });

    it('should return 0 if the cards have no story points', () => {
      const cardWithNoStoryPoints = { ...mockCard, storyPoints: 0 };
      const listWithCards = { ...mockList, cards: [cardWithNoStoryPoints] };
      test = component.getTotalStoryPoints(listWithCards);
      expect(test).toEqual(0);
    });

    it('should return the total amount of story points', () => {
      const cardWith2StoryPoints = { ...mockCard, storyPoints: 2 };
      const cardWith5StoryPoints = { ...mockCard, storyPoints: 5 };
      const listWithCards = { ...mockList, cards: [cardWith2StoryPoints, cardWith5StoryPoints] };
      test = component.getTotalStoryPoints(listWithCards);
      expect(test).toEqual(7);
    });
  });
});
