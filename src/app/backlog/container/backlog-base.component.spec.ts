import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BacklogBaseComponent } from './backlog-base.component';

describe('BacklogBaseComponent', () => {
  let component: BacklogBaseComponent;
  let fixture: ComponentFixture<BacklogBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BacklogBaseComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BacklogBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
