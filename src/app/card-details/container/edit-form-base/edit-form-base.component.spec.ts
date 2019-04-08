import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFormBaseComponent } from './edit-form-base.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Store } from '@ngrx/store';
import * as actions from '../../state/actions';
import { mockCard } from '@app/test/data';
import { of } from 'rxjs';

describe('EditFormBaseComponent', () => {
  let component: EditFormBaseComponent;
  let fixture: ComponentFixture<EditFormBaseComponent>;
  let store;
  let spy;
  let action;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditFormBaseComponent],
      providers: [{ provide: Store, useValue: { dispatch: jest.fn(), pipe: jest.fn() } }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFormBaseComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    beforeEach(() => {
      store = TestBed.get(Store);
    });
    it('should create a form group', () => {
      store.pipe = jest.fn(() => of(false));
      spy = jest.spyOn(<any>component, 'createForm');

      component.card = mockCard;
      fixture.detectChanges();

      expect(spy).toHaveBeenCalled();
      expect(component.cardForm).not.toBeUndefined();
    });
  });

  describe('saveCard', () => {
    beforeEach(() => {
      store = TestBed.get(Store);
      component.card = mockCard;
      store.pipe = jest.fn(() => of(true));
      fixture.detectChanges();
    });

    it('should dispatch hideDetails if the form is not touched', () => {
      action = new actions.HideDetails();
      spy = jest.spyOn(store, 'dispatch');

      component.saveCard();

      expect(spy).toHaveBeenCalledWith(action);
    });
  });
});
