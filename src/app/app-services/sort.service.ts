import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ColumnSortedEvent } from '@app/models';

@Injectable({
  providedIn: 'root',
})
export class SortService {
  constructor() {}

  private columnSortedSource = new Subject<ColumnSortedEvent>();
  columnSorted$ = this.columnSortedSource.asObservable();

  columnSorted(event: ColumnSortedEvent) {
    this.columnSortedSource.next(event);
  }
}
