import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BacklogTotalsComponent } from './backlog-totals.component';

describe('BacklogTotalsComponent', () => {
  let component: BacklogTotalsComponent;
  let fixture: ComponentFixture<BacklogTotalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BacklogTotalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BacklogTotalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
