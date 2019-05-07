import { Component, OnInit, Input, HostListener, OnDestroy } from '@angular/core';
import { SortService } from '@app/app-services';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[sortable-column]',
  templateUrl: './sortable-column.component.html',
  styleUrls: ['./sortable-column.component.scss'],
})
export class SortableColumnComponent implements OnInit, OnDestroy {
  // tslint:disable-next-line:no-input-rename
  @Input('sortable-column') columnName: string;
  // tslint:disable-next-line:no-input-rename
  @Input('sort-direction') sortDirection: 'asc' | 'desc' | '';

  unsubscribe$ = new Subject<void>();

  constructor(private sortService: SortService) {}

  @HostListener('click')
  sort() {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.sortService.columnSorted({ sortColumn: this.columnName, sortDirection: this.sortDirection });
  }

  ngOnInit() {
    // Subscribe to sort changes so we can react when other columns are sorted
    this.sortService.columnSorted$.pipe(takeUntil(this.unsubscribe$)).subscribe(event => {
      // Reset this column's sort direction to hide the sort icons
      if (this.columnName !== event.sortColumn) {
        this.sortDirection = '';
      }
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
