import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardDetailsViewComponent } from './card-details-view.component';

describe('CardDetailsViewComponent', () => {
  let component: CardDetailsViewComponent;
  let fixture: ComponentFixture<CardDetailsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardDetailsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardDetailsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
