import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BacklogNavComponent } from './backlog-nav.component';

describe('BacklogNavComponent', () => {
  let component: BacklogNavComponent;
  let fixture: ComponentFixture<BacklogNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BacklogNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BacklogNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
