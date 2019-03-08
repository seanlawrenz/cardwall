import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TdTooltipDirective } from '@app/shared/directives/tooltip-directive';

import { BacklogMoveToolbarComponent } from './backlog-move-toolbar.component';
import { ButtonComponent } from '@app/shared/components/button/button.component';
import { Store } from '@ngrx/store';
import { hot } from 'jasmine-marbles';

describe('BacklogMoveToolbarComponent', () => {
  let component: BacklogMoveToolbarComponent;
  let fixture: ComponentFixture<BacklogMoveToolbarComponent>;
  let store;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BacklogMoveToolbarComponent, ButtonComponent, TdTooltipDirective],
      providers: [{ provide: Store, useValue: { dispatch: jest.fn(), pipe: jest.fn(), select: jest.fn() } }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BacklogMoveToolbarComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should subscribe to the store for select card', () => {
  //   store.pipe = hot('-a', { a: undefined });
  //   const spy = jest.spyOn(store, 'select');
  //   fixture.detectChanges();
  //   expect(spy).toHaveBeenCalled();
  // });
});
