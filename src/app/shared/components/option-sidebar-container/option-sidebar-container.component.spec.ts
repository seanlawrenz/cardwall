import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionSidebarContainerComponent } from './option-sidebar-container.component';

describe('OptionSidebarContainerComponent', () => {
  let component: OptionSidebarContainerComponent;
  let fixture: ComponentFixture<OptionSidebarContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptionSidebarContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionSidebarContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
