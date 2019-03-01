import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionSidebarContainerComponent } from './option-sidebar-container.component';
import { Store } from '@ngrx/store';

describe('OptionSidebarContainerComponent', () => {
  let component: OptionSidebarContainerComponent;
  let fixture: ComponentFixture<OptionSidebarContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OptionSidebarContainerComponent],
      providers: [{ provide: Store, useValue: { dispatch: jest.fn(), select: jest.fn(() => ({ subscribe: jest.fn() })) } }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionSidebarContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
