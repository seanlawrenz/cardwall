import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import * as issueActions from '@app/card-details/state/actions/issues.actions';

import { IssuesBaseComponent } from './issues-base.component';
import { mockCard, mockIssue } from '@app/test/data';
import { hot, getTestScheduler } from 'jasmine-marbles';

describe('IssuesBaseComponent', () => {
  let component: IssuesBaseComponent;
  let fixture: ComponentFixture<IssuesBaseComponent>;
  let store;
  let spy;
  let action;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IssuesBaseComponent],
      providers: [{ provide: Store, useValue: { dispatch: jest.fn(), pipe: jest.fn() } }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssuesBaseComponent);
    component = fixture.componentInstance;
    component.card = mockCard;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    beforeEach(() => (store = TestBed.get(Store)));

    it('should dispatch to get issues', () => {
      spy = jest.spyOn(store, 'dispatch');
      action = new issueActions.FetchIssues(mockCard);

      fixture.detectChanges();

      expect(spy).toHaveBeenCalledWith(action);
    });

    it('should get the issues for a card', done => {
      store.pipe = jest.fn(() => hot('-a', { a: [mockIssue] }));

      fixture.detectChanges();

      component.issues$.subscribe(issues => {
        expect(issues).toEqual([mockIssue]);
        done();
      });

      getTestScheduler().flush();
    });

    it('should get the loading status', done => {
      store.pipe = jest.fn(() => hot('-a', { a: true }));

      fixture.detectChanges();

      component.loading$.subscribe(isLoading => {
        expect(isLoading).toBeTruthy();
        done();
      });

      getTestScheduler().flush();
    });
    it('should get errors from issue fetching', done => {
      const error = { message: 'Error', reason: `He's dead Jim` };
      store.pipe = jest.fn(() => hot('-a', { a: error }));

      fixture.detectChanges();

      component.error$.subscribe(err => {
        expect(err).toEqual(error);
        done();
      });

      getTestScheduler().flush();
    });
  });
});
