import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardwallCardsViewComponent } from './cardwall-cards-view.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SortablejsModule } from 'angular-sortablejs';

import { ConfigService } from '@app/app-services';
import { mockConfigService } from '@app/test/mocks';
import { mockCard, mockResource, mockCardBuilder } from '@app/test/data';

describe('CardwallCardsViewComponent', () => {
  let component: CardwallCardsViewComponent;
  let fixture: ComponentFixture<CardwallCardsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CardwallCardsViewComponent],
      imports: [SortablejsModule],
      providers: [{ provide: ConfigService, useValue: mockConfigService }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardwallCardsViewComponent);
    component = fixture.componentInstance;
    component.cards = [mockCard];
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('updateSelectedResource', () => {
    it('should add the card ids that have their owner selected', () => {
      const cardWithOwnerSelected = mockCardBuilder();
      cardWithOwnerSelected.owners = [mockResource];
      component.cards = [mockCard, cardWithOwnerSelected];
      component.selectedResource = mockResource;

      fixture.detectChanges();

      expect(component.cardsWithSelectedResource).toEqual([cardWithOwnerSelected.id]);
    });
  });
});
