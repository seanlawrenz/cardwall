import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardwallCardsViewComponent } from './cardwall-cards-view.component';

describe('CardwallCardsViewComponent', () => {
  let component: CardwallCardsViewComponent;
  let fixture: ComponentFixture<CardwallCardsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardwallCardsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardwallCardsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
