import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SavingComponent } from './saving.component';
import { Store } from '@ngrx/store';

describe('SavingComponent', () => {
  let component: SavingComponent;
  let fixture: ComponentFixture<SavingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SavingComponent],
      providers: [{ provide: Store, useValue: { select: jest.fn() } }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SavingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
