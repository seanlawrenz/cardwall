import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'td-story-point-indicator',
  templateUrl: './story-point-indicator.component.html',
  styleUrls: ['./story-point-indicator.component.scss'],
})
export class StoryPointIndicatorComponent {
  @Input() storyPoints = 0;
  @Input() isSummary = false;
  @Input() isSelected = false;

  @Output() storyPointsClicked = new EventEmitter<void>();

  public getStoryPointsTooltip(): string {
    if (this.storyPoints === 1) {
      return `1 Story Point`;
    } else if (this.storyPoints > 0) {
      return `${this.storyPoints} Story Points`;
    } else if (this.isSummary) {
      return `No story point estimates are present`;
    } else {
      return `This card has not been given a story point estimate`;
    }
  }

  onStoryPointsClicked() {
    this.storyPointsClicked.emit();
  }
}
