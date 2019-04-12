import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'td-filter-toolbar',
  templateUrl: './filter-toolbar.component.html',
  styleUrls: ['./filter-toolbar.component.scss'],
})
export class FilterToolbarComponent implements OnInit {
  @Output() search = new EventEmitter<string>();
  searchText = '';

  constructor() {}

  ngOnInit() {}

  valueChange(event: string) {
    this.search.emit(event);
  }
}
