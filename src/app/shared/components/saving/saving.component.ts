import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'td-saving',
  templateUrl: './saving.component.html',
  styleUrls: ['./saving.component.scss'],
})
export class SavingComponent implements OnInit {
  @Input() showSaving = false;

  ngOnInit() {}
}
