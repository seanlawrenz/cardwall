import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Store } from '@ngrx/store';

import { SharedModule } from '@app/shared/shared.module';
import { CardwallSettingsContainerComponent } from './cardwall-settings-container.component';
import { CardwallSettingsComponent } from '@app/cardwall/components/cardwall-settings/cardwall-settings.component';

describe('CardwallSettingsContainerComponent', () => {
  let component: CardwallSettingsContainerComponent;
  let fixture: ComponentFixture<CardwallSettingsContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CardwallSettingsContainerComponent, CardwallSettingsComponent],
      imports: [NoopAnimationsModule, SharedModule],
      providers: [{ provide: Store, useValue: { dispatch: jest.fn(), select: jest.fn(() => ({ subscribe: jest.fn() })) } }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardwallSettingsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
