import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BoardColors } from '@app/models';

@Component({
  selector: 'td-card-css-colors',
  templateUrl: './card-css-colors.component.html',
  styleUrls: ['./card-css-colors.component.scss'],
})
export class CardCssColorsComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() colors: BoardColors[];

  className = 'tdNg-card-color-';
  chosen: string;

  constructor() {}

  ngOnInit() {
    this.chosen = this.cssClass.value;
  }

  updateCssClass(color: string) {
    this.cssClass.setValue(color);
    this.chosen = this.cssClass.value;
  }

  get cssClass() {
    return this.form.get('cssClass');
  }
}
