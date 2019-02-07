import { TestBed } from '@angular/core/testing';

import { SpinnerService } from './spinner.service';
import { Store } from '@ngrx/store';

import * as UIActions from '@app/store/actions/ui.actions';

describe('SpinnerService', () => {
  let service: SpinnerService;
  let action;
  let store;
  let spy;
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [{ provide: Store, useValue: { dispatch: jest.fn() } }],
    }),
  );

  it('should be created', () => {
    service = TestBed.get(SpinnerService);
    expect(service).toBeTruthy();
  });

  it('should dispatch out to show spinner', () => {
    service = TestBed.get(SpinnerService);
    store = TestBed.get(Store);
    action = new UIActions.ShowSpinner();
    spy = jest.spyOn(store, 'dispatch');

    service.showSpinner();

    expect(spy).toHaveBeenCalledWith(action);
  });

  it('should dispatch out to hide spinner', () => {
    service = TestBed.get(SpinnerService);
    store = TestBed.get(Store);
    action = new UIActions.HideSpinner();
    spy = jest.spyOn(store, 'dispatch');

    service.hideSpinner();

    expect(spy).toHaveBeenCalledWith(action);
  });
});
