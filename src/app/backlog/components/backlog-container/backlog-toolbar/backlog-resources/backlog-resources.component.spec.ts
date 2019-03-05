import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BacklogResourcesComponent } from './backlog-resources.component';

describe('BacklogResourcesComponent', () => {
  let component: BacklogResourcesComponent;
  let fixture: ComponentFixture<BacklogResourcesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BacklogResourcesComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BacklogResourcesComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
