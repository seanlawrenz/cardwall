import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { hot, cold } from 'jasmine-marbles';

import * as attachmentActions from '../actions/attachment.actions';

import { CardDetailsAttachmentEffects } from './attachments.effects';
import { SignalRService } from '@app/app-services';
import { SignalRResult } from '@app/models';

import { TestActions, getActions } from '@app/test/mocks';
import { mockAttachment, mockCard } from '@app/test/data';

describe('CardDetailsAttachmentEffects', () => {
  let actions: TestActions;
  let effects: CardDetailsAttachmentEffects;
  let signalR: SignalRService;
  let action;
  let outcome;
  let response;
  let expected;
  let signalRResult: SignalRResult;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CardDetailsAttachmentEffects,
        { provide: Actions, useFactory: getActions },
        { provide: SignalRService, useValue: { invoke: jest.fn() } },
      ],
    });
  });

  it('should be created', () => {
    effects = TestBed.get(CardDetailsAttachmentEffects);
    expect(effects).toBeTruthy();
  });

  describe('fetchAttachments', () => {
    beforeEach(() => {
      actions = TestBed.get(Actions);
      signalR = TestBed.get(SignalRService);
    });

    it('should return an observable of FetchAttachmentSuccess', () => {
      signalRResult = {
        isSuccessful: true,
        item: [mockAttachment],
      };
      action = new attachmentActions.FetchAttachments(mockCard);
      outcome = new attachmentActions.FetchAttachmentsSuccess([mockAttachment]);
      actions.stream = hot('-a', { a: action });
      response = cold('-a|', { a: signalRResult });
      expected = cold('--b', { b: outcome });
      signalR.invoke = jest.fn(() => response);

      effects = TestBed.get(CardDetailsAttachmentEffects);

      expect(effects.fetchAttachments$).toBeObservable(expected);
    });
  });
});
