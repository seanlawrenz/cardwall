import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardwallToolbarComponent } from './cardwall-toolbar.component';

describe('CardwallToolbarComponent', () => {
  let component: CardwallToolbarComponent;
  let fixture: ComponentFixture<CardwallToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardwallToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardwallToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
