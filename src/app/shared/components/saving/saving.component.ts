import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { fromRoot } from '@app/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'td-saving',
  templateUrl: './saving.component.html',
  styleUrls: ['./saving.component.scss'],
})
export class SavingComponent implements OnInit {
  isSaving$: Observable<boolean>;

  constructor(private store: Store<fromRoot.State>) {}

  ngOnInit() {
    this.isSaving$ = this.store.select(fromRoot.isSaving);
  }
}
