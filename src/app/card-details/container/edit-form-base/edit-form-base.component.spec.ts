import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFormBaseComponent } from './edit-form-base.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Store } from '@ngrx/store';
import * as actions from '../../state/actions';
import { mockCard, mockBoard } from '@app/test/data';
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
      providers: [
        {
          provide: Store,
          useValue: {
            dispatch: jest.fn(),
            select: jest.fn(() => ({ pipe: jest.fn(() => ({ subscribe: jest.fn() })) })),
            pipe: jest.fn(() => ({ subscribe: jest.fn() })),
          },
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFormBaseComponent);
    component = fixture.componentInstance;
    component.card = mockCard;
    fixture.detectChanges();
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

      expect(component.cardForm).not.toBeUndefined();
    });
  });

  describe('saveCardOnHideDetails', () => {
    beforeEach(() => {
      store = TestBed.get(Store);
    });

    it('should dispatch hideDetails if the form is not touched', () => {
      action = new actions.HideDetails();
      spy = jest.spyOn(store, 'dispatch');
      store.pipe = jest.fn(() => of(true));
      component.cardForm.status = 'VALID';

      component.saveCardOnHideDetails();
      expect(spy).toHaveBeenCalledWith(action);
      expect(component.cardForm.status).toEqual('VALID');
    });
  });

  describe('saveCard', () => {
    beforeEach(() => {
      store = TestBed.get(Store);
      component.plan = mockBoard;
    });
    it('should dispatch SaveCard if form is touched and valid', () => {
      action = new actions.SaveCard({ card: mockCard, useRemainingHours: mockBoard.useRemainingHours });
      spy = jest.spyOn(store, 'dispatch');

      component.cardForm.markAsTouched();
      component.saveCard();
      expect(spy).toHaveBeenCalledWith(action);
    });
  });
});
