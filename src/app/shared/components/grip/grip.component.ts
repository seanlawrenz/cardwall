import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'td-grip',
  templateUrl: './grip.component.html',
  styleUrls: ['./grip.component.scss'],
})
export class GripComponent implements OnInit {
  @Input() cardColor: string;
  backgroundColor: string;

  ngOnInit() {}
}
