import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BacklogSettingsContainerComponent } from './backlog-settings-container.component';

describe('BacklogSettingsContainerComponent', () => {
  let component: BacklogSettingsContainerComponent;
  let fixture: ComponentFixture<BacklogSettingsContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BacklogSettingsContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BacklogSettingsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
