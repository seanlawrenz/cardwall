import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Store } from '@ngrx/store';
import { fromRoot } from '@app/store';

@Component({
  selector: 'td-option-sidebar-container',
  templateUrl: './option-sidebar-container.component.html',
  styleUrls: ['./option-sidebar-container.component.scss'],
})
export class OptionSidebarContainerComponent implements OnInit {
  @ViewChild('transitionDiv') transitionalDiv: ElementRef;

  showOptions = false;
  constructor(private store: Store<fromRoot.State>, private render: Renderer2) {}

  ngOnInit() {
    this.store.select(fromRoot.isOptionsShowing).subscribe(res => this.onSideBarStateChanged(res));
  }

  onSideBarStateChanged(show: boolean) {
    if (show === this.showOptions) {
      return;
    }
    if (show) {
      this.showOptions = true;
      this.render.addClass(this.transitionalDiv.nativeElement, 'tdNg-darken-background');
    } else {
      this.showOptions = false;
      this.render.addClass(this.transitionalDiv.nativeElement, 'tdNg-lighten-background');
      setTimeout(() => {
        this.render.removeClass(this.transitionalDiv.nativeElement, 'tdNg-darken-background');
        this.render.removeClass(this.transitionalDiv.nativeElement, 'tdNg-lighten-background');
      }, 500);
    }
  }
}
