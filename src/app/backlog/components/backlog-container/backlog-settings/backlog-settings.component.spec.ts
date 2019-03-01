import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BacklogSettingsComponent } from './backlog-settings.component';

describe('BacklogSettingsComponent', () => {
  let component: BacklogSettingsComponent;
  let fixture: ComponentFixture<BacklogSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BacklogSettingsComponent],
      imports: [FormsModule, ReactiveFormsModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BacklogSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
