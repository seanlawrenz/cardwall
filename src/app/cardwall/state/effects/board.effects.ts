import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store, Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { withLatestFrom, map, catchError, mergeMap } from 'rxjs/operators';

import { fromRoot, rootSelectors } from '@app/store';
import * as boardActions from '../actions';

import { SignalRService, BoardService } from '@app/app-services';
import { SignalRResult } from '@app/models';
import { standardErrorLang } from '@app/constants';

@Injectable()
export class BoardEffects {
  constructor(
    private actions$: Actions,
    private store: Store<fromRoot.State>,
    private signalR: SignalRService,
    private boardService: BoardService,
  ) {}

  @Effect()
  loadBoard$: Observable<Action> = this.actions$.pipe(
    ofType(boardActions.BoardActionTypes.GET_BOARD),
    withLatestFrom(this.store.select(rootSelectors.getRouterState), (action, router) => {
      const {
        state: {
          params: { projectId, boardId },
        },
      } = router;

      return {
        projectId,
        boardId,
      };
    }),
    mergeMap(({ projectId, boardId }) =>
      this.boardService.fetchBoard(projectId, boardId).pipe(
        map((result: SignalRResult) => {
          if (result.isSuccessful) {
            return new boardActions.GetBoardSuccess(result.item);
          } else {
            return new boardActions.GetBoardError({ message: result.message, reason: result.reason });
          }
        }),
        catchError(err => of(new boardActions.GetBoardError({ message: 'Server Error', reason: standardErrorLang }))),
      ),
    ),
  );
}
