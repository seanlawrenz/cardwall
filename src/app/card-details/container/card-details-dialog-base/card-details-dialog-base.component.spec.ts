import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { CardDetailsDialogBaseComponent } from './card-details-dialog-base.component';
import { Store } from '@ngrx/store';
import { CardDetailsPageTypes } from '@app/models';
import { of } from 'rxjs';
import * as actions from '../../state/actions';

describe('CardDetailsDialogBaseComponent', () => {
  let component: CardDetailsDialogBaseComponent;
  let fixture: ComponentFixture<CardDetailsDialogBaseComponent>;
  let store;
  let spy;
  let action;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CardDetailsDialogBaseComponent],
      providers: [{ provide: Store, useValue: { dispatch: jest.fn(), pipe: jest.fn(), select: jest.fn() } }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardDetailsDialogBaseComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('closeCardDetails', () => {
    beforeEach(() => (store = TestBed.get(Store)));
    it('should dispatch hideDetailsRequested when the card tab is FORM', () => {
      action = new actions.HideDetailsRequested();
      spy = jest.spyOn(store, 'dispatch');
      store.pipe = jest.fn(() => of(CardDetailsPageTypes.FORM));
      fixture.detectChanges();
      component.closeCardDetails();

      expect(spy).toHaveBeenCalledWith(action);
    });

    it('should dispatch hideDetails when the card tab not FORM', () => {
      action = new actions.HideDetails();
      spy = jest.spyOn(store, 'dispatch');
      store.pipe = jest.fn(() => of(CardDetailsPageTypes.SUBTASKS));
      fixture.detectChanges();

      component.closeCardDetails();

      expect(spy).toHaveBeenCalledWith(action);
    });
  });
});
