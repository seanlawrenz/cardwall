import { Injectable } from '@angular/core';

import { SignalRService } from './signal-r.service';
import { Board, SignalRResult } from '@app/models';
import { Observable, of } from 'rxjs';

import { split } from 'lodash';
import { uniqueValuesInArray } from '@app/utils';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  constructor(private signalR: SignalRService) {}

  getBoardsFromParams(params: string): Observable<Board[]> {
    const boards: Board[] = [];
    // If the backlog manager starts with no params then return empty array
    if (params === undefined) {
      return of(boards);
    }

    return new Observable(observer => {
      const paramsSplitIntoProjectPlanPairs: string[] = uniqueValuesInArray(split(params, ','));
      const projectPlanPairsSplitIntoPairs: Array<string[]> = paramsSplitIntoProjectPlanPairs.map(pair => split(pair, '_'));

      const fetchBoardFromSignalR = (projectPlanPairs: Array<string[]>, i: number) => {
        const projectId: number = parseInt(projectPlanPairs[i][0], 10);
        const planId: number = parseInt(projectPlanPairs[i][1], 10);

        this.signalR.invoke('BoardGet', planId, projectId).subscribe((res: SignalRResult) => {
          boards.push(res.item);
          if (boards.length === projectPlanPairs.length) {
            observer.next(boards);
            observer.complete();
          } else {
            fetchBoardFromSignalR(projectPlanPairs, i + 1);
          }
        });
      };

      fetchBoardFromSignalR(projectPlanPairsSplitIntoPairs, 0);
    });
  }
}
