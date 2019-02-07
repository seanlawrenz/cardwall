import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import { fromRoot } from '@app/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'td-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent implements OnInit {
  showSpinner$: Observable<boolean>;
  constructor(private store: Store<fromRoot.State>) {}

  ngOnInit() {
    this.showSpinner$ = this.store.pipe(select(fromRoot.isSpinnerShowing));
  }
}
