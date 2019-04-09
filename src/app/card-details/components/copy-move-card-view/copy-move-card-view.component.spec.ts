import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CopyMoveCardViewComponent } from './copy-move-card-view.component';

describe('CopyMoveCardViewComponent', () => {
  let component: CopyMoveCardViewComponent;
  let fixture: ComponentFixture<CopyMoveCardViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CopyMoveCardViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CopyMoveCardViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
