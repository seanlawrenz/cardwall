import { Component, OnInit, Input } from '@angular/core';
import { Issue } from '@app/models';

@Component({
  selector: 'td-issue-view',
  templateUrl: './issue-view.component.html',
  styleUrls: ['./issue-view.component.scss'],
})
export class IssueViewComponent implements OnInit {
  @Input() issues: Issue[];

  constructor() {}

  ngOnInit() {
    console.log(this.issues);
  }
}
