import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Store } from '@ngrx/store';
import { hot, getTestScheduler } from 'jasmine-marbles';

import * as attachmentActions from '@app/card-details/state/actions/attachment.actions';

import { AttachmentsBaseComponent } from './attachments-base.component';
import { mockCard, mockAttachment } from '@app/test/data';
import { ErrorFromSignalR } from '@app/models';

describe('AttachmentsBaseComponent', () => {
  let component: AttachmentsBaseComponent;
  let fixture: ComponentFixture<AttachmentsBaseComponent>;
  let store;
  let action;
  let spy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AttachmentsBaseComponent],
      providers: [{ provide: Store, useValue: { dispatch: jest.fn(), pipe: jest.fn() } }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttachmentsBaseComponent);
    component = fixture.componentInstance;
    component.card = mockCard;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    beforeEach(() => (store = TestBed.get(Store)));

    it('should dispatch to get the attachments', () => {
      action = new attachmentActions.FetchAttachments(mockCard);
      spy = jest.spyOn(store, 'dispatch');

      fixture.detectChanges();

      expect(spy).toHaveBeenCalledWith(action);
    });

    describe('attachments$', () => {
      it('should be an observable of an array of attachments', done => {
        store.pipe = jest.fn(() => hot('-a', { a: [mockAttachment] }));

        fixture.detectChanges();

        component.attachments$.subscribe(attachments => {
          expect(attachments).toEqual([mockAttachment]);
          done();
        });

        getTestScheduler().flush();
      });
    });

    describe('loading$', () => {
      it('should be an observable of a boolean', done => {
        store.pipe = jest.fn(() => hot('-a', { a: true }));

        fixture.detectChanges();

        component.loading$.subscribe(isLoading => {
          expect(isLoading).toEqual(true);
          done();
        });

        getTestScheduler().flush();
      });
    });

    describe('errors$', () => {
      it('should be an observable of an error', done => {
        const serverError: ErrorFromSignalR = { message: 'Server Error', reason: 'too many secrets' };
        store.pipe = jest.fn(() => hot('-a', { a: serverError }));

        fixture.detectChanges();

        component.error$.subscribe(error => {
          expect(error).toEqual(serverError);
          done();
        });

        getTestScheduler().flush();
      });
    });
  });
});
