import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { SubtasksViewComponent } from './subtasks-view.component';
import { SortablejsModule } from 'angular-sortablejs';
import { ConfigService } from '@app/app-services';
import { mockConfigService } from '@app/test/mocks';

describe('SubtasksViewComponent', () => {
  let component: SubtasksViewComponent;
  let fixture: ComponentFixture<SubtasksViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SubtasksViewComponent],
      providers: [{ provide: ConfigService, useValue: mockConfigService }],
      imports: [SortablejsModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubtasksViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
