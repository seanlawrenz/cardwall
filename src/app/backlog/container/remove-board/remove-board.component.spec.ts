import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveBoardComponent } from './remove-board.component';

describe('RemoveBoardComponent', () => {
  let component: RemoveBoardComponent;
  let fixture: ComponentFixture<RemoveBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemoveBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
