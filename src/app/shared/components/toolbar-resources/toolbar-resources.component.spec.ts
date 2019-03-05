import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarResourcesComponent } from './toolbar-resources.component';

describe('ToolbarResourcesComponent', () => {
  let component: ToolbarResourcesComponent;
  let fixture: ComponentFixture<ToolbarResourcesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolbarResourcesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarResourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
