import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { Store } from '@ngrx/store';

import { SharedModule } from '@app/shared/shared.module';
import { CardwallSettingsContainerComponent } from './cardwall-settings-container.component';

import * as cardwallActions from '@app/cardwall/state/actions';

describe('CardwallSettingsContainerComponent', () => {
  let component: CardwallSettingsContainerComponent;
  let fixture: ComponentFixture<CardwallSettingsContainerComponent>;
  let store;
  let action;
  let spy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CardwallSettingsContainerComponent],
      imports: [NoopAnimationsModule, SharedModule],
      providers: [
        { provide: Store, useValue: { dispatch: jest.fn(), pipe: jest.fn(), select: jest.fn(() => ({ subscribe: jest.fn() })) } },
      ],
      schemas: [NO_ERRORS_SCHEMA],
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

  describe('toggleShowInactiveLists', () => {
    beforeEach(() => (store = TestBed.get(Store)));

    it('should dispatch showInactiveLists if show is requested', () => {
      action = new cardwallActions.ShowInactiveLists();
      spy = jest.spyOn(store, 'dispatch');

      component.toggleShowInactiveLists(true);

      expect(spy).toHaveBeenCalled();
    });
  });
});
