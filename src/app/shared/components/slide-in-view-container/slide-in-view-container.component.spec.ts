import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { SlideInViewContainerComponent } from './slide-in-view-container.component';
import { Store } from '@ngrx/store';

describe('SlideInViewContainerComponent', () => {
  let component: SlideInViewContainerComponent;
  let fixture: ComponentFixture<SlideInViewContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SlideInViewContainerComponent],
      imports: [NoopAnimationsModule],
      providers: [{ provide: Store, useValue: { select: () => ({ subscribe: jest.fn() }) } }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlideInViewContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
