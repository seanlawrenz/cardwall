import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardwallSettingsComponent } from './cardwall-settings.component';

describe('CardwallSettingsComponent', () => {
  let component: CardwallSettingsComponent;
  let fixture: ComponentFixture<CardwallSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardwallSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardwallSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
