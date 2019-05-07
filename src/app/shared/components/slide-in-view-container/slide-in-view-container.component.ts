import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { fromRoot } from '@app/store';
import { Subject } from 'rxjs';
import { ViewVisibility } from '@app/models';
import { slideInOutFromBottom } from '@app/animations/slide-in-out.animation';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'td-slide-in-view-container',
  templateUrl: './slide-in-view-container.component.html',
  styleUrls: ['./slide-in-view-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
  animations: [slideInOutFromBottom],
})
export class SlideInViewContainerComponent implements OnInit, OnDestroy {
  unsubscribe$ = new Subject<void>();
  sliderState: ViewVisibility;
  showSlider: boolean;
  constructor(private store: Store<fromRoot.State>) {}

  ngOnInit() {
    this.store
      .select(fromRoot.isSliderShowing)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(visible => this.onSlideStateChanged(visible));
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
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
