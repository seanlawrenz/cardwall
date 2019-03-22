import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UiSwitchModule } from 'ngx-ui-switch';

import { EditCardFormComponent } from './edit-card-form.component';
import { ConfigService } from '@app/app-services';
import { NgSelectModule } from '@ng-select/ng-select';
import { ResourcesListComponent } from './resources-list/resources-list.component';
import { SharedModule } from '@app/shared/shared.module';

import { mockConfigService } from '@app/test/mocks';
import { mockCard, mockResource, mockBoard } from '@app/test/data';

describe('EditCardFormComponent', () => {
  let component: EditCardFormComponent;
  let fixture: ComponentFixture<EditCardFormComponent>;
  let configService: ConfigService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditCardFormComponent, ResourcesListComponent],
      imports: [FormsModule, ReactiveFormsModule, NgSelectModule, SharedModule, UiSwitchModule],
      providers: [{ provide: ConfigService, useValue: mockConfigService }],
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
    });

    it('should not allow permission to someone who cannot update tasks or edit', () => {
      configService.config.CanUpdateTasks = false;
      configService.config.CanUpdateMyTasksOnly = false;
      configService.config.CanEditTasks = false;
      component._card = mockCard;

      fixture.detectChanges();

      expect(component.canEditOrUpdate).toBeFalsy();
    });

    it('should allow permission to someone who can update tasks', () => {
      configService.config.CanUpdateTasks = true;
      component._card = mockCard;

      fixture.detectChanges();

      expect(component.canEditOrUpdate).toBeTruthy();
    });

    it('should allow permission to someone who can update their own tasks and assigned to it', () => {
      configService.config.CanUpdateTasks = false;
      configService.config.CanUpdateMyTasksOnly = true;
      const mockCardWithThisOwner = { ...mockCard, owners: [mockResource] };
      configService.config.UID = mockResource.uid;
      component._card = mockCardWithThisOwner;

      fixture.detectChanges();

      expect(component.isAssigned).toBeTruthy();
      expect(component.canEditOrUpdate).toBeTruthy();
    });

    it('should not allow permission to someone who can update their own tasks but not assigned to it', () => {
      configService.config.CanUpdateTasks = false;
      configService.config.CanUpdateMyTasksOnly = true;
      const mockCardWithNoOwners = { ...mockCard, owners: [] };
      configService.config.UID = mockResource.uid;
      component._card = mockCardWithNoOwners;

      fixture.detectChanges();

      expect(component.isAssigned).toBeFalsy();
      expect(component.canEditOrUpdate).toBeFalsy();
    });

    it('should allow permissions to someone who can edit tasks', () => {
      configService.config.CanUpdateTasks = false;
      configService.config.CanUpdateMyTasksOnly = false;
      configService.config.CanEditTasks = true;
      component._card = mockCard;

      fixture.detectChanges();

      expect(component.canEditOrUpdate).toBeTruthy();
    });
  });
});
