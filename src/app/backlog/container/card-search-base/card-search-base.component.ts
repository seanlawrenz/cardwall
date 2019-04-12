import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'td-card-search-base',
  templateUrl: './card-search-base.component.html',
  styleUrls: ['./card-search-base.component.scss'],
})
export class CardSearchBaseComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  search(term) {
    console.log(term);
  }
}
