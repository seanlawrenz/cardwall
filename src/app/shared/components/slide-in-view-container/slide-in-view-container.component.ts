import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { fromRoot } from '@app/store';
import { Subscription } from 'rxjs';
import { ViewVisibility } from '@app/models';
import { slideInOutFromBottom } from '@app/animations/slide-in-out.animation';

@Component({
  selector: 'td-slide-in-view-container',
  templateUrl: './slide-in-view-container.component.html',
  styleUrls: ['./slide-in-view-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
  animations: [slideInOutFromBottom],
})
export class SlideInViewContainerComponent implements OnInit, OnDestroy {
  subscription = new Subscription();
  sliderState: ViewVisibility;
  showSlider: boolean;
  constructor(private store: Store<fromRoot.State>) {}

  ngOnInit() {
    this.store.select(fromRoot.isSliderShowing).subscribe(visible => this.onSlideStateChanged(visible));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSlideStateChanged(show: boolean) {
    if (show === this.showSlider) {
      return;
    }

    if (show) {
      this.showSlider = true;
      this.sliderState = ViewVisibility.VISIBLE;
    } else {
      this.sliderState = ViewVisibility.NOT_VISIBLE;
      this.showSlider = false;
    }
  }
}
