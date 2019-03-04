import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BacklogToolbarContainerComponent } from './backlog-toolbar-container.component';
import { Store } from '@ngrx/store';

describe('BacklogToolbarContainerComponent', () => {
  let component: BacklogToolbarContainerComponent;
  let fixture: ComponentFixture<BacklogToolbarContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BacklogToolbarContainerComponent],
      providers: [{ provide: Store, useValue: { pipe: jest.fn(), select: jest.fn() } }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BacklogToolbarContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
