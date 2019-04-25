import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { hot, getTestScheduler } from 'jasmine-marbles';

import * as subtasksActions from '@app/card-details/state/actions/subtasks.actions';

import { SubtasksBaseComponent } from './subtasks-base.component';
import { mockCard, mockSubtask } from '@app/test/data';
import { SubtasksViewComponent } from '@app/card-details/components/subtasks-view/subtasks-view.component';

describe('SubtasksBaseComponent', () => {
  let component: SubtasksBaseComponent;
  let fixture: ComponentFixture<SubtasksBaseComponent>;
  let store;
  let action;
  let spy;
  // let expected;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SubtasksBaseComponent, SubtasksViewComponent],
      providers: [{ provide: Store, useValue: { dispatch: jest.fn(), pipe: jest.fn() } }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubtasksBaseComponent);
    component = fixture.componentInstance;
    component.card = mockCard;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnit', () => {
    beforeEach(() => (store = TestBed.get(Store)));
    it(`should dispatch to get the subtasks of it's card`, () => {
      action = new subtasksActions.FetchSubtasks(mockCard);
      spy = jest.spyOn(store, 'dispatch');

      fixture.detectChanges();

      expect(spy).toHaveBeenCalledWith(action);
    });

    describe('subtasks$', () => {
      it('should be an observable of an array of subtasks', done => {
        store.pipe = jest.fn(() => hot('-a', { a: [mockSubtask] }));

        fixture.detectChanges();

        component.subtasks$.subscribe(subtasks => {
          expect(subtasks).toEqual([mockSubtask]);
          done();
        });

        getTestScheduler().flush();
      });
    });

    describe('loading$', () => {
      it('should be an observable of a boolean', done => {
        store.pipe = jest.fn(() => hot('-a', { a: true }));

        fixture.detectChanges();

        component.loading$.subscribe(loading => {
          expect(loading).toBeTruthy();
          done();
        });

        getTestScheduler().flush();
      });
    });
  });
});
