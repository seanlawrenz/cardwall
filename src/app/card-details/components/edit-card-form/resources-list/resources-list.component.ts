import { Component, Input, ViewChild } from '@angular/core';
import { Resources, Card } from '@app/models';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'td-resources-list',
  templateUrl: './resources-list.component.html',
  styleUrls: ['./resources-list.component.scss'],
})
export class ResourcesListComponent {
  @Input() resources: Resources[];
  @Input() card: Card;
  @Input() formGroup: FormGroup;

  @ViewChild('mulitSelectList') multiSelectList;
}
