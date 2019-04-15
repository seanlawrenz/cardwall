import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/compiler/src/core';

import { CardSearchBaseComponent } from './card-search-base.component';

import { Store } from '@ngrx/store';
import * as actions from '../../state/actions';

describe('CardSearchBaseComponent', () => {
  let component: CardSearchBaseComponent;
  let fixture: ComponentFixture<CardSearchBaseComponent>;
  let store;
  let spy;
  let action;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CardSearchBaseComponent],
      providers: [{ provide: Store, useValue: { dispatch: jest.fn() } }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardSearchBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch to the store on search()', () => {
    store = TestBed.get(Store);
    spy = jest.spyOn(store, 'dispatch');
    action = new actions.SearchPlans('test');

    component.search('test');

    expect(spy).toHaveBeenCalledWith(action);
  });
});
