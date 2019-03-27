import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { fromRoot } from '@app/store';
import * as uiActions from '@app/store/actions/ui.actions';
import { Card, Plan, Board } from '@app/models';

import { upperFirst } from 'lodash';

@Component({
  selector: 'td-copy-move-card',
  templateUrl: './copy-move-card.component.html',
  styleUrls: ['./copy-move-card.component.scss'],
})
export class CopyMoveCardComponent implements OnInit {
  constructor(private store: Store<fromRoot.State>) {}
  @Input() card: Card;
  @Input() plan: Plan | Board;
  @Input() mode: string;

  ngOnInit() {}

  hide() {
    this.store.dispatch(new uiActions.HideSlider());
  }
}
