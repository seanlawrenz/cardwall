import { Component, OnInit, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { fromRoot } from '@app/store';
import * as cardDetailActions from '@app/card-details/state/actions';
import * as selectors from '@app/card-details/state/selectors';

import { Card, Subtask } from '@app/models';

@Component({
  selector: 'td-subtasks-base',
  templateUrl: './subtasks-base.component.html',
  styleUrls: ['./subtasks-base.component.scss'],
})
export class SubtasksBaseComponent implements OnInit {
  @Input() card: Card;

  subtasks$: Observable<Subtask[]>;
  loading$: Observable<boolean>;
  saving$: Observable<boolean>;
  error$: Observable<string>;

  constructor(private store: Store<fromRoot.State>) {}

  ngOnInit() {
    this.store.dispatch(new cardDetailActions.FetchSubtasks(this.card));
    this.subtasks$ = this.store.pipe(select(selectors.getSubtasks));
    this.loading$ = this.store.pipe(select(selectors.isSubtasksLoading));
    this.saving$ = this.store.pipe(select(selectors.isSubtasksSaving));
    this.error$ = this.store.pipe(select(selectors.getSubtasksError));
  }

  updateSubtask(subtask: Subtask) {
    this.store.dispatch(new cardDetailActions.UpdateSubtask({ subtask, card: this.card }));
  }

  updateSubtaskOrder(event: { newIndex: number; subtask: Subtask }) {
    const { newIndex, subtask } = event;
    this.store.dispatch(new cardDetailActions.SetSubtasksOrder({ card: this.card, subtask, newIndex }));
  }

  promoteSubtask(subtask) {
    this.store.dispatch(new cardDetailActions.PromoteSubtask({ card: this.card, subtask }));
  }
}
