import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Resources } from '@app/models';

@Component({
  selector: 'td-filter-card-by-resource',
  templateUrl: './filter-card-by-resource.component.html',
  styleUrls: ['./filter-card-by-resource.component.scss'],
})
export class FilterCardByResourceComponent implements OnInit {
  @Input() resources: Resources[];
  @Output() valueChange = new EventEmitter<Resources[]>();

  constructor() {}

  ngOnInit() {}

  searchResource(resources: Resources[]) {
    this.valueChange.emit(resources);
  }
}
