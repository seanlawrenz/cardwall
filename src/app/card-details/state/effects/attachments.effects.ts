import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';

import * as attachmentActions from '../actions/attachment.actions';

import { SignalRService } from '@app/app-services';
import { SignalRResult } from '@app/models';

@Injectable()
export class CardDetailsAttachmentEffects {
  constructor(private actions$: Actions, private signalR: SignalRService) {}

  @Effect()
  fetchAttachments$: Observable<Action> = this.actions$.pipe(
    ofType(attachmentActions.CardDetailsAttachmentTypes.FETCH_ATTACHMENTS),
    switchMap((action: attachmentActions.FetchAttachments) =>
      this.signalR.invoke('CardAttachmentList', action.payload.id).pipe(
        // Looks like signalR will only return a isSuccessful
        map((result: SignalRResult) => new attachmentActions.FetchAttachmentsSuccess(result.item)),
        catchError(error => of(new attachmentActions.FetchAttachmentsError({ message: 'Server Error', reason: error }))),
      ),
    ),
  );
}
