import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Card, Resources } from '@app/models';
import { AppService } from '@app/app-services';

@Component({
  selector: 'td-card-resource-icons',
  templateUrl: './card-resource-icons.component.html',
  styleUrls: ['./card-resource-icons.component.scss'],
})
export class CardResourceIconsComponent implements OnInit {
  @Input() card: Card;
  @Input() maxInlineResources = 6;
  @Input() expandsInline = true;

  @Output() resourceClick = new EventEmitter<Resources>();

  isAllOwnersShown = false;

  constructor(private appService: AppService) {}

  ngOnInit() {}

  showAllOwners() {
    if (this.expandsInline) {
      this.isAllOwnersShown = !this.isAllOwnersShown;
    } else {
      this.appService.showCardDetails(this.card);
    }
  }

  onResourceClick(resource: Resources) {
    if (resource) {
      this.resourceClick.emit(resource);
    }
  }
}
