import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { SubtasksViewComponent } from './subtasks-view.component';
import { SortablejsModule } from 'angular-sortablejs';
import { ConfigService } from '@app/app-services';
import { mockConfigService } from '@app/test/mocks';
import { mockSubtask } from '@app/test/data';

describe('SubtasksViewComponent', () => {
  let component: SubtasksViewComponent;
  let fixture: ComponentFixture<SubtasksViewComponent>;
  let spy;

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
    component.subtasks = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('setPercentComplete', () => {
    const mockSubtaskComplete = { ...mockSubtask, percentCompleteWhole: 100 };
    const mockSubtaskNotComplete = { ...mockSubtask, percentCompleteWhole: 0 };

    it('should set the percentComplete to 50', () => {
      component.subtasks = [mockSubtaskNotComplete, mockSubtaskComplete];

      component['setPercentComplete']();

      expect(component.percentComplete).toEqual(50);
    });

    it('should handle no subtasks', () => {
      component.subtasks = [];

      expect(() => {
        component['setPercentComplete']();
        expect(component.percentComplete).toEqual(0);
      }).not.toThrowError();
    });
  });

  describe('creatSubtask', () => {
    it('should emit the new subtask title if valid', () => {
      const newTitle = 'I am a new title';
      const expected = {
        title: newTitle,
        ID: 0,
        percentCompleteWhole: 0,
        order: 0,
      };

      spy = jest.spyOn(component.createSubtaskRequested, 'emit');
      component.newSubtaskForm.controls['title'].setValue(newTitle);
      component.canAddCards = true;

      component.createSubtask();

      expect(spy).toHaveBeenCalledWith(expected);
    });

    it('should not emit if not valid', () => {
      spy = jest.spyOn(component.createSubtaskRequested, 'emit');
      component.canAddCards = true;

      component.createSubtask();

      expect(spy).not.toHaveBeenCalled();
    });
  });
});
