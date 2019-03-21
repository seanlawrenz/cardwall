import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MuiltSelectComponent } from './muilt-select.component';

describe('MuiltSelectComponent', () => {
  let component: MuiltSelectComponent;
  let fixture: ComponentFixture<MuiltSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MuiltSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MuiltSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
