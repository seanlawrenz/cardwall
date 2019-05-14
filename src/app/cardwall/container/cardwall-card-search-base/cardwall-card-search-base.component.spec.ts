import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardwallCardSearchBaseComponent } from './cardwall-card-search-base.component';

describe('CardwallCardSearchBaseComponent', () => {
  let component: CardwallCardSearchBaseComponent;
  let fixture: ComponentFixture<CardwallCardSearchBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardwallCardSearchBaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardwallCardSearchBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
