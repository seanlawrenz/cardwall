import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@app/shared/shared.module';
import { AddCardComponent } from './add-card.component';
import { CardService } from '@app/app-services';
import { Store } from '@ngrx/store';
import { mockCard } from '@app/test/data';
import { of } from 'rxjs';

import * as cardActions from '@app/store/actions/card.actions';

describe('AddCardComponent', () => {
  let component: AddCardComponent;
  let fixture: ComponentFixture<AddCardComponent>;
  let spy;
  let cardSvc: CardService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddCardComponent],
      imports: [FormsModule, ReactiveFormsModule, SharedModule],
      providers: [{ provide: CardService, useValue: { buildNewCard: jest.fn() } }, { provide: Store, useValue: { dispatch: jest.fn() } }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set up the form', () => {
    fixture.detectChanges();

    expect(component.newCardForm).not.toBeUndefined();
  });

  describe('onSubmit', () => {
    let store;
    let action;
    beforeEach(() => {
      fixture.detectChanges();
      cardSvc = TestBed.get(CardService);
      store = TestBed.get(Store);
    });

    it('should not call card service if form is invalid', () => {
      spy = jest.spyOn(cardSvc, 'buildNewCard');

      component.onSubmit();

      expect(spy).not.toHaveBeenCalled();
    });

    it('should call the build new card on submit', () => {
      cardSvc.buildNewCard = jest.fn(() => ({
        subscribe: jest.fn(() => ({ card: mockCard, orders: [{ cardID: mockCard.id, order: 1 }] })),
      }));
      spy = jest.spyOn(cardSvc, 'buildNewCard');
      component.newCardForm.setValue({ title: mockCard.name });

      component.onSubmit();

      expect(spy).toHaveBeenCalledWith(component.list, mockCard.name);
    });

    it('should dispatch CardCreatedFromServer and reset the form', () => {
      const info = { card: mockCard, orders: [{ cardID: mockCard.id, order: 1 }] };
      action = new cardActions.CardCreateFromServer(info);
      cardSvc.buildNewCard = jest.fn(() => ({
        subscribe: jest.fn(() => ({ card: mockCard, orders: [{ cardID: mockCard.id, order: 1 }] })),
      }));
      jest.spyOn(cardSvc, 'buildNewCard').mockImplementationOnce(() => of(info));
      spy = jest.spyOn(store, 'dispatch');
      component.newCardForm.setValue({ title: mockCard.name });

      component.onSubmit();

      expect(spy).toHaveBeenCalledWith(action);
      expect(component.newCardForm.controls['title'].value).toEqual('');
    });
  });
});
