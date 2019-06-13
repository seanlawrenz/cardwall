import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { TotalsContainerComponent } from './totals-container.component';
import { Store } from '@ngrx/store';

describe('TotalsContainerComponent', () => {
  let component: TotalsContainerComponent;
  let fixture: ComponentFixture<TotalsContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TotalsContainerComponent],
      providers: [{ provide: Store, useValue: { pipe: jest.fn() } }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
