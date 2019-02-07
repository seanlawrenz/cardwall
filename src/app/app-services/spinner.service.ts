import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { fromRoot } from '@app/store';
import * as UIActions from '@app/store/actions/ui.actions';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  constructor(private store: Store<fromRoot.State>) {}

  showSpinner() {
    this.store.dispatch(new UIActions.ShowSpinner());
  }

  hideSpinner() {
    this.store.dispatch(new UIActions.HideSpinner());
  }
}
