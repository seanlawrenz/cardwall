import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Renderer2,
  HostListener,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { fromRoot, rootSelectors } from '@app/store';
import * as rootActions from '@app/store/actions/ui.actions';
import { optionsSidebar } from '@app/animations/option-sidebar.animation';

@Component({
  selector: 'td-option-sidebar-container',
  templateUrl: './option-sidebar-container.component.html',
  styleUrls: ['./option-sidebar-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
  animations: [optionsSidebar],
})
export class OptionSidebarContainerComponent implements OnInit {
  @ViewChild('transitionDiv') transitionalDiv: ElementRef;
  @ViewChild('sidebarContainer') sidebarContainer: ElementRef;

  optionSidebarState = 'not-visible';
  showOptions = false;

  @HostListener('click', ['$event.target'])
  isOutsideContent(target: Element) {
    if (this.showOptions) {
      if (target.contains(this.sidebarContainer.nativeElement)) {
        this.hide();
      }
    }
  }

  constructor(private store: Store<fromRoot.State>, private render: Renderer2, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.store.select(rootSelectors.isOptionsShowing).subscribe(res => this.onSideBarStateChanged(res));
  }

  hide() {
    this.store.dispatch(new rootActions.HideOptions());
  }

  onSideBarStateChanged(show: boolean) {
    if (show === this.showOptions) {
      return;
    }
    if (show) {
      this.showOptions = true;
      this.optionSidebarState = 'visible';
      this.render.addClass(this.transitionalDiv.nativeElement, 'tdNg-darken-background');
    } else {
      this.optionSidebarState = 'not-visible';
      this.render.addClass(this.transitionalDiv.nativeElement, 'tdNg-lighten-background');
      setTimeout(() => {
        this.render.removeClass(this.transitionalDiv.nativeElement, 'tdNg-darken-background');
        this.render.removeClass(this.transitionalDiv.nativeElement, 'tdNg-lighten-background');
        this.showOptions = false;
        this.cdr.markForCheck();
      }, 500);
    }
  }
}
