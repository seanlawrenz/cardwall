import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssuesBaseComponent } from './issues-base.component';

describe('IssuesBaseComponent', () => {
  let component: IssuesBaseComponent;
  let fixture: ComponentFixture<IssuesBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssuesBaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssuesBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
