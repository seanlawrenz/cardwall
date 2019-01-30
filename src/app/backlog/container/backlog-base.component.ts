import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromBacklog from '../state';
import * as backlogActions from '../state/backlog.actions';

@Component({
  selector: 'app-backlog-base',
  templateUrl: './backlog-base.component.html',
  styleUrls: ['./backlog-base.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BacklogBaseComponent implements OnInit {
  projects = '';
  plans$: Observable<any>;

  constructor(private store: Store<fromBacklog.State>) {}

  ngOnInit() {
    this.store.dispatch(new backlogActions.GetBoardsInParams());
    this.store.pipe(select(fromBacklog.getBoard)).subscribe(board => {
      console.log('from effects', board);
    });
  }
}
