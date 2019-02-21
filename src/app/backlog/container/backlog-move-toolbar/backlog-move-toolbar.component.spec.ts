import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TdTooltipDirective } from '@app/shared/directives/tooltip-directive';

import { BacklogMoveToolbarComponent } from './backlog-move-toolbar.component';
import { ButtonComponent } from '@app/shared/components/button/button.component';
import { Store } from '@ngrx/store';

describe('BacklogMoveToolbarComponent', () => {
  let component: BacklogMoveToolbarComponent;
  let fixture: ComponentFixture<BacklogMoveToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BacklogMoveToolbarComponent, ButtonComponent, TdTooltipDirective],
      providers: [{ provide: Store, useValue: { dispatch: jest.fn() } }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BacklogMoveToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
