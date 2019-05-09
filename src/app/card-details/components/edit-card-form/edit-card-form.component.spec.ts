import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { UiSwitchModule } from 'ngx-ui-switch';
import { PopoverModule } from 'ngx-bootstrap/popover';

import { EditCardFormComponent } from './edit-card-form.component';
import { ConfigService } from '@app/app-services';
import { NgSelectModule } from '@ng-select/ng-select';
import { ResourcesListComponent } from './resources-list/resources-list.component';

import { mockConfigService } from '@app/test/mocks';
import { mockCard, mockResource, mockBoard } from '@app/test/data';
import { NO_ERRORS_SCHEMA } from '@angular/compiler/src/core';

const cardForm: FormGroup = new FormGroup({
  name: new FormControl(mockCard.name, [Validators.required]),
  description: new FormControl(mockCard.description),
  startDate: new FormControl(mockCard.startDate),
  endDate: new FormControl(mockCard.endDate),
  estimatedHrs: new FormControl(mockCard.estimatedHours, [Validators.required, Validators.min(0), Validators.max(2147483647)]),
  remainingHrs: new FormControl(mockCard.remainingHours, Validators.required),
  percentComplete: new FormControl(mockCard.percentComplete, [Validators.required, Validators.min(0), Validators.max(100)]),
  priorityId: new FormControl(mockCard.priorityId),
  isStory: new FormControl(mockCard.isStory),
  storyPoints: new FormControl(mockCard.storyPoints, [Validators.required, Validators.min(0), Validators.max(2147483647)]),
  valuePoints: new FormControl(mockCard.valuePoints, [Validators.required, Validators.min(0), Validators.max(2147483647)]),
  owners: new FormControl(mockCard.owners),
  tags: new FormControl(mockCard.tags),
  cssClass: new FormControl(mockCard.cssClass),
});

describe('EditCardFormComponent', () => {
  let component: EditCardFormComponent;
  let fixture: ComponentFixture<EditCardFormComponent>;
  let configService: ConfigService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditCardFormComponent, ResourcesListComponent],
      imports: [FormsModule, ReactiveFormsModule, NgSelectModule, PopoverModule, UiSwitchModule],
      providers: [{ provide: ConfigService, useValue: mockConfigService }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCardFormComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('setPermissions', () => {
    beforeEach(() => {
      configService = TestBed.get(ConfigService);
      component.plan = mockBoard;
      component.cardForm = cardForm;
    });

    it('should not allow permission to someone who cannot update tasks or edit', () => {
      configService.config.CanUpdateTasks = false;
      configService.config.CanUpdateMyTasksOnly = false;
      configService.config.CanEditTasks = false;
      component.card = mockCard;

      fixture.detectChanges();

      expect(component.canEditOrUpdate).toBeFalsy();
    });

    it('should allow permission to someone who can update tasks', () => {
      configService.config.CanUpdateTasks = true;
      component.card = mockCard;

      fixture.detectChanges();

      expect(component.canEditOrUpdate).toBeTruthy();
    });

    it('should allow permission to someone who can update their own tasks and assigned to it', () => {
      configService.config.CanUpdateTasks = false;
      configService.config.CanUpdateMyTasksOnly = true;
      const mockCardWithThisOwner = { ...mockCard, owners: [mockResource] };
      configService.config.UID = mockResource.uid;
      component.card = mockCardWithThisOwner;

      fixture.detectChanges();

      expect(component.isAssigned).toBeTruthy();
      expect(component.canEditOrUpdate).toBeTruthy();
    });

    it('should not allow permission to someone who can update their own tasks but not assigned to it', () => {
      configService.config.CanUpdateTasks = false;
      configService.config.CanUpdateMyTasksOnly = true;
      const mockCardWithNoOwners = { ...mockCard, owners: [] };
      configService.config.UID = mockResource.uid;
      component.card = mockCardWithNoOwners;

      fixture.detectChanges();

      expect(component.isAssigned).toBeFalsy();
      expect(component.canEditOrUpdate).toBeFalsy();
    });

    it('should allow permissions to someone who can edit tasks', () => {
      configService.config.CanUpdateTasks = false;
      configService.config.CanUpdateMyTasksOnly = false;
      configService.config.CanEditTasks = true;
      component.card = mockCard;

      fixture.detectChanges();

      expect(component.canEditOrUpdate).toBeTruthy();
    });
  });
});
