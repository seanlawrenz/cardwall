import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';

import * as cardDetailsActions from '../actions';
import { Observable, of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';

import { SignalRService } from '@app/app-services';
import { SignalRResult, Card } from '@app/models';

@Injectable()
export class CopyMoveCardEffects {
  constructor(private actions$: Actions, private signalRService: SignalRService) {}

  @Effect()
  loadProjects$: Observable<Action> = this.actions$.pipe(
    ofType(cardDetailsActions.CopyMoveCardTypes.GET_PROJECTS),
    switchMap(({ payload: { isTemplate } }) => {
      const methodName: string = isTemplate ? 'ProjectTemplateTypeAheadList' : 'ProjectTypeAheadList';
      return this.signalRService.invoke(methodName).pipe(
        map((result: SignalRResult) => {
          if (result.isSuccessful) {
            return new cardDetailsActions.GetProjectSuccess(result.item);
          } else {
            return new cardDetailsActions.GetProjectsError(result.message);
          }
        }),
        catchError(err => of(new cardDetailsActions.GetProjectsError(err))),
      );
    }),
  );

  @Effect()
  loadPlans$: Observable<Action> = this.actions$.pipe(
    ofType(cardDetailsActions.CopyMoveCardTypes.GET_PLANS),
    switchMap(({ payload: { projectID } }) =>
      this.signalRService.invoke('BoardList', projectID).pipe(
        map((result: SignalRResult) => new cardDetailsActions.GetPlansSuccess(result.item)),
        catchError(err => of(new cardDetailsActions.GetPlansError(err))),
      ),
    ),
  );

  @Effect()
  loadLists$: Observable<Action> = this.actions$.pipe(
    ofType(cardDetailsActions.CopyMoveCardTypes.GET_LISTS),
    switchMap(({ payload: { projectId, planId } }) =>
      this.signalRService.invoke('StatusesGet', projectId, planId).pipe(
        map((result: SignalRResult) => new cardDetailsActions.GetListsSuccess(result.item)),
        catchError(err => of(new cardDetailsActions.GetListsError(err))),
      ),
    ),
  );

  @Effect()
  copyMoveCard$: Observable<Action> = this.actions$.pipe(
    ofType(cardDetailsActions.CopyMoveCardTypes.COPY_MOVE_CARD),
    switchMap(({ payload: { card, projectId, planId, listId, type } }) => {
      const newListId = listId === '' ? 0 : listId;
      switch (type) {
        case 'copy':
          return this.signalRService.invoke('CardCopy', card, projectId, planId, newListId).pipe(
            map((result: SignalRResult) => new cardDetailsActions.CopyMoveCardSuccess(result.item)),
            catchError(err => of(new cardDetailsActions.CopyMoveCardError(err))),
          );
          break;

        case 'move':
          const moveCard = { ...(card as Card) };
          // Moved to Same board
          if (moveCard.planId === planId) {
            if (moveCard.listId !== newListId) {
              moveCard.listId = newListId;
              // Update the order
              moveCard.order = 1;
              return this.signalRService.invoke('CardUpdate', moveCard, true, null).pipe(
                map((result: SignalRResult) => new cardDetailsActions.CopyMoveCardSuccess(result.item)),
                catchError(err => of(new cardDetailsActions.CopyMoveCardError(err))),
              );
            } else {
              return of(new cardDetailsActions.CopyMoveCardError('Cannot move card to same list'));
            }
          } else {
            return this.signalRService.invoke('CardMove', moveCard, projectId, planId, newListId, false).pipe(
              map((result: SignalRResult) => new cardDetailsActions.CopyMoveCardSuccess(result.item)),
              catchError(err => of(new cardDetailsActions.CopyMoveCardError(err))),
            );
          }
      }
    }),
  );
}
