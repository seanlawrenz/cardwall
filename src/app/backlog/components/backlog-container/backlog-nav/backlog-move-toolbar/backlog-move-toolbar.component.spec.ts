import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BacklogMoveToolbarComponent } from './backlog-move-toolbar.component';

describe('BacklogMoveToolbarComponent', () => {
  let component: BacklogMoveToolbarComponent;
  let fixture: ComponentFixture<BacklogMoveToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BacklogMoveToolbarComponent ]
    })
    .compileComponents();
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
