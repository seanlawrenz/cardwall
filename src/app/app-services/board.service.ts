import { Injectable } from '@angular/core';

import { SignalRService } from './signal-r.service';
import { Plan, SignalRResult, Board } from '@app/models';
import { Observable, of } from 'rxjs';

import { split, remove } from 'lodash';
import { uniqueValuesInArray } from '@app/utils';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  constructor(private signalR: SignalRService) {}

  getPlansFromParams(params: string): Observable<Plan[]> {
    const plans: Plan[] = [];
    // If the backlog manager starts with no params then return empty array
    if (params === undefined) {
      return of(plans);
    }

    return new Observable(observer => {
      const paramsSplitIntoProjectPlanPairs: string[] = remove(uniqueValuesInArray(split(params, ',')), pair => pair !== '');
      const projectPlanPairsSplitIntoPairs: Array<string[]> = paramsSplitIntoProjectPlanPairs.map(pair => split(pair, '_'));

      // Recursive function to run through each param that we get
      const fetchBoardFromSignalR = (projectPlanPairs: Array<string[]>, i: number) => {
        const projectId: number = parseInt(projectPlanPairs[i][0], 10);
        const planId: number = parseInt(projectPlanPairs[i][1], 10);

        const continueFetching = () => {
          if (plans.length === projectPlanPairs.length) {
            observer.next(plans);
            observer.complete();
          } else {
            fetchBoardFromSignalR(projectPlanPairs, i + 1);
          }
        };

        this.fetchPlan(planId, projectId).subscribe(plan => {
          plans.push(plan);
          continueFetching();
        });
      };

      if (projectPlanPairsSplitIntoPairs.length > 0) {
        fetchBoardFromSignalR(projectPlanPairsSplitIntoPairs, 0);
      } else {
        observer.next([]);
        observer.complete();
      }
    });
  }

  private fetchPlan(planId: number, projectId: number): Observable<Plan> {
    return new Observable(observer => {
      const result$: Observable<SignalRResult> = this.signalR.invoke('BoardGet', planId, projectId);
      result$.subscribe(res => {
        const plan: Plan = res.item;
        if (!res.isSuccessful) {
          plan.erroredDuringFetching = true;
          plan.message = res.message;
          plan.reason = res.reason;
          plan.id = planId;
          observer.next(plan);
          observer.complete();
        } else {
          this.joinProjectGroup(projectId).subscribe(joinGroupResponse => {
            if (!joinGroupResponse.isSuccessful) {
              plan.erroredDuringFetching = true;
              plan.message = joinGroupResponse.message;
              plan.reason = joinGroupResponse.reason;
            }
            observer.next(plan);
            observer.complete();
          });
        }
      });
    });
  }

  private joinProjectGroup(projectId: number): Observable<SignalRResult> {
    return this.signalR.invoke('JoinProjectGroup', projectId);
  }
}
