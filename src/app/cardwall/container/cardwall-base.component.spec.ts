import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import * as cardwallActions from '@app/cardwall/state/actions';

import { CardwallBaseComponent } from './cardwall-base.component';
import { Store } from '@ngrx/store';
import { mockBoard } from '@app/test/data';

describe('CardwallBaseComponent', () => {
  let component: CardwallBaseComponent;
  let fixture: ComponentFixture<CardwallBaseComponent>;
  let spy;
  let action;
  let store;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CardwallBaseComponent],
      imports: [RouterTestingModule],
      providers: [{ provide: Store, useValue: { dispatch: jest.fn(), select: jest.fn() } }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardwallBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('editBoard', () => {
    it('should dispatch to update the board name', () => {
      store = TestBed.get(Store);
      spy = jest.spyOn(store, 'dispatch');
      const newName = 'new name';
      const updatedBoard = { ...mockBoard, name: newName };
      action = new cardwallActions.EditBoardName(updatedBoard);

      component.editBoard(updatedBoard);

      expect(spy).toHaveBeenCalledWith(action);
    });
  });
});
