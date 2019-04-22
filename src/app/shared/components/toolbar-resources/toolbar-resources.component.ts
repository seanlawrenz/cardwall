import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Resources, Plan, List, Board, Card } from '@app/models';
import { ConfigService } from '@app/app-services';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'td-toolbar-resources',
  templateUrl: './toolbar-resources.component.html',
  styleUrls: ['./toolbar-resources.component.scss'],
})
export class ToolbarResourcesComponent implements OnInit, OnChanges {
  @Input() resource: Resources;
  @Input() plans: Plan[];
  @Input() selectedCard: Card;
  @Input() clearAssignments: boolean;

  profileUrl: SafeResourceUrl;
  reportUrl: SafeResourceUrl;
  addResourceData: { resource: Resources; clearAssignments: boolean };

  totalCards = 0;
  totalStoryPoints = 0;
  totalEstimatedHours = 0;

  canViewReport = false;
  isSelected = false;
  isHighlighted = false;

  constructor(private config: ConfigService, private sanitizer: DomSanitizer) {}

  ngOnInit() {
    // Grab the analysis perm from the config setting
    this.canViewReport = this.config.config.HasAnalysis;

    // Set URLs relative to the base path, ensuring that things are properly encoded
    const base: string = this.config.config.TDNextBasePath;
    this.profileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`${base}Apps/People/PersonDet.aspx?U=${this.resource.uid}`);
    this.reportUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      `${base}Apps/Analysis/RptSchedule.aspx?UID=${this.resource.uid}&UIDName=${this.resource.name}&AutoRun=1`,
    );

    this.getTotals();

    this.getIsHighlighted();

    this.addResourceData = { resource: this.resource, clearAssignments: this.clearAssignments };
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.plans && !changes.plans.firstChange) {
      this.getTotals();
    } else if (changes.clearAssignments && !changes.clearAssignments.firstChange) {
      this.addResourceData.clearAssignments = changes.clearAssignments.currentValue;
    }
    this.getIsHighlighted();
  }

  getIsHighlighted() {
    if (this.selectedCard) {
      this.isHighlighted = this.selectedCard.owners.filter(owner => owner.referenceId === this.resource.referenceId).length > 0;
    } else {
      this.isHighlighted = false;
    }
  }

  private getTotals() {
    let totalCards = 0;
    let totalStoryPoints = 0;
    let totalHours = 0;

    const getMetaData = (plan: Plan | Board) => {
      const activeLists: List[] = plan.lists.filter(list => list.active && list.id > 0);

      activeLists.map(list => {
        list.cards.map(card => {
          if (card.owners && card.owners.filter(owner => owner.referenceId === this.resource.referenceId).length > 0) {
            totalCards++;
            totalStoryPoints += card.storyPoints;

            // Get only the resource's portion of the card if it has multiple resources associated
            // We're discounting percent complete here because we want figures to line up between the UI and sidebar
            totalHours += card.estimatedHours / card.owners.length;
          }
        });
      });
    };

    if (this.plans) {
      this.plans.map(plan => {
        getMetaData(plan);
      });
    }

    this.totalCards = totalCards;
    this.totalStoryPoints = totalStoryPoints;
    this.totalEstimatedHours = totalHours;
  }
}
