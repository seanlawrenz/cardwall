import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/compiler/src/core';

import { BacklogResourcesComponent } from './backlog-resources.component';

describe('BacklogResourcesComponent', () => {
  let component: BacklogResourcesComponent;
  let fixture: ComponentFixture<BacklogResourcesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BacklogResourcesComponent],
      schemas: [NO_ERRORS_SCHEMA],
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
