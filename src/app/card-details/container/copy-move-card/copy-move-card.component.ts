import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { fromRoot } from '@app/store';
import * as uiActions from '@app/store/actions/ui.actions';

@Component({
  selector: 'td-copy-move-card',
  templateUrl: './copy-move-card.component.html',
  styleUrls: ['./copy-move-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class CopyMoveCardComponent implements OnInit {
  constructor(private store: Store<fromRoot.State>) {}

  ngOnInit() {}

  hide() {
    this.store.dispatch(new uiActions.HideSlider());
  }
}
