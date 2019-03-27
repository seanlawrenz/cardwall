import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CopyMoveCardComponent } from './copy-move-card.component';

describe('CopyMoveCardComponent', () => {
  let component: CopyMoveCardComponent;
  let fixture: ComponentFixture<CopyMoveCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CopyMoveCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CopyMoveCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
