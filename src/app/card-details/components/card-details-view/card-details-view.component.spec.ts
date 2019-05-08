import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/compiler/src/core';

import { CardDetailsViewComponent } from './card-details-view.component';
import { TrimTextToLimitPipe } from '@app/shared/pipes/trim-text-to-limit.pipe';
import { mockCard } from '@app/test/data';
import { CardColors } from '@app/models';

describe('CardDetailsViewComponent', () => {
  let component: CardDetailsViewComponent;
  let fixture: ComponentFixture<CardDetailsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CardDetailsViewComponent, TrimTextToLimitPipe],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardDetailsViewComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the background color for the card', () => {
    component.card = mockCard;
    mockCard.cssClass = CardColors.WARNING;

    fixture.detectChanges();

    expect(component.cardBackgroundColor).toBe(`tdNg-card-color-warning`);
  });
});
