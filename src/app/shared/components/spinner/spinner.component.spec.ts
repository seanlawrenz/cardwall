import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinnerComponent } from './spinner.component';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';

import { Store } from '@ngrx/store';
import { hot, cold } from 'jasmine-marbles';

describe('SpinnerComponent', () => {
  let component: SpinnerComponent;
  let fixture: ComponentFixture<SpinnerComponent>;
  let store;
  let expected;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SpinnerComponent, LoadingSpinnerComponent],
      providers: [{ provide: Store, useValue: { pipe: jest.fn(), select: jest.fn() } }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpinnerComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should get an observable of a boolean', () => {
      store.pipe = jest.fn(() => hot('-a', { a: true }));

      fixture.detectChanges();

      expected = cold('-a', { a: true });
      expect(component.showSpinner$).toBeObservable(expected);
    });
  });
});
