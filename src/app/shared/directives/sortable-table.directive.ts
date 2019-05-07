import { Directive, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { SortService } from '@app/app-services';
import { ColumnSortedEvent } from '@app/models';

@Directive({
  selector: '[tdSortableTable]',
})
export class SortableTableDirective implements OnInit, OnDestroy {
  constructor(private sortService: SortService) {}

  @Output() sorted = new EventEmitter<ColumnSortedEvent>();

  private columnSortedSub: Subscription;

  ngOnInit() {
    this.columnSortedSub = this.sortService.columnSorted$.subscribe(event => {
      this.sorted.emit(event);
    });
  }

  ngOnDestroy() {
    this.columnSortedSub.unsubscribe();
  }
}
