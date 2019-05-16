import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardwallListComponent } from './cardwall-list.component';

describe('CardwallListComponent', () => {
  let component: CardwallListComponent;
  let fixture: ComponentFixture<CardwallListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardwallListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardwallListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
