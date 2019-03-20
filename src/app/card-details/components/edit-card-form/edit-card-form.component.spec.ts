import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCardFormComponent } from './edit-card-form.component';
import { ConfigService } from '@app/app-services';
import { mockConfigService } from '@app/test/mocks';
import { mockCard, mockResource } from '@app/test/data';

describe('EditCardFormComponent', () => {
  let component: EditCardFormComponent;
  let fixture: ComponentFixture<EditCardFormComponent>;
  let configService: ConfigService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditCardFormComponent],
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
