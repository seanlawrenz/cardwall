import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { BacklogSettingsContainerComponent } from './backlog-settings-container.component';
import { Store } from '@ngrx/store';
import * as settingActions from '@app/backlog/state/actions/backlog-settings.actions';

describe('BacklogSettingsContainerComponent', () => {
  let component: BacklogSettingsContainerComponent;
  let fixture: ComponentFixture<BacklogSettingsContainerComponent>;
  let store;
  let action;
  let spy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BacklogSettingsContainerComponent],
      providers: [{ provide: Store, useValue: { dispatch: jest.fn(), pipe: jest.fn(), select: jest.fn() } }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BacklogSettingsContainerComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch WIPLimit UI state to true', () => {
    action = new settingActions.ShowWIPLimits();
    spy = jest.spyOn(store, 'dispatch');
    component.updateWIPLimit(true);
    expect(spy).toHaveBeenCalledWith(action);
  });

  it('should dispatch WIPLimit UI state to false', () => {
    action = new settingActions.HideWIPLimits();
    spy = jest.spyOn(store, 'dispatch');
    component.updateWIPLimit(false);
    expect(spy).toHaveBeenCalledWith(action);
  });

  it('should dispatch storyPoints UI state to true', () => {
    action = new settingActions.ShowStoryPoints();
    spy = jest.spyOn(store, 'dispatch');
    component.updateStoryPoints(true);
    expect(spy).toHaveBeenCalledWith(action);
  });

  it('should dispatch storyPoints UI state to false', () => {
    action = new settingActions.HideStoryPoints();
    spy = jest.spyOn(store, 'dispatch');
    component.updateStoryPoints(false);
    expect(spy).toHaveBeenCalledWith(action);
  });

  it('should dispatch estimate Hours UI state to true', () => {
    action = new settingActions.ShowEstimatedHours();
    spy = jest.spyOn(store, 'dispatch');
    component.updateEstimatedHours(true);
    expect(spy).toHaveBeenCalledWith(action);
  });

  it('should dispatch storyPoints UI state to false', () => {
    action = new settingActions.HideEstimatedHours();
    spy = jest.spyOn(store, 'dispatch');
    component.updateEstimatedHours(false);
    expect(spy).toHaveBeenCalledWith(action);
  });
});
