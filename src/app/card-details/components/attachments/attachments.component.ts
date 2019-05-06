import { Component, OnInit, Input } from '@angular/core';
import { Attachment, ErrorFromSignalR } from '@app/models';

@Component({
  selector: 'td-attachments',
  templateUrl: './attachments.component.html',
  styleUrls: ['./attachments.component.scss'],
})
export class AttachmentsComponent implements OnInit {
  @Input() attachments: Attachment[];
  @Input() error: ErrorFromSignalR;
  constructor() {}

  ngOnInit() {}
}
