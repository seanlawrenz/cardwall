import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

import { CopyMoveCardViewComponent } from './copy-move-card-view.component';
import { mockProject1, mockProject2, mockProject3, mockProject4, mockCard } from '@app/test/data';

describe('CopyMoveCardViewComponent', () => {
  let component: CopyMoveCardViewComponent;
  let fixture: ComponentFixture<CopyMoveCardViewComponent>;
  let spy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CopyMoveCardViewComponent],
      imports: [FormsModule, ReactiveFormsModule, NgSelectModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CopyMoveCardViewComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    beforeEach(() => {
      const projects = [mockProject1, mockProject2, mockProject3, mockProject4];
      const mockCardFromMockProject = { ...mockCard, projectId: mockProject2.ID };
      component.projects = projects;
      component.plans = [];
      component.lists = [];
      component.card = mockCardFromMockProject;
    });

    it(`should create the form and set the projectID to the card's project ID`, () => {
      spy = jest.spyOn(<any>component, 'setupForm');

      fixture.detectChanges();

      expect(spy).toHaveBeenCalled();
      expect(component.form.value.projectID).toEqual(mockProject2.ID);
    });
  });
});
