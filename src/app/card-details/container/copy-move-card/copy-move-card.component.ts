import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { fromRoot } from '@app/store';
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

  @Output() closeCopyMoveSlider = new EventEmitter<void>();

  ngOnInit() {
    console.log('init for copy move card');
  }

  hide() {
    this.closeCopyMoveSlider.emit();
  }
}
