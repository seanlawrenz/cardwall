import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileImageComponent } from './profile-image.component';
import { ConfigService } from '@app/app-services';
import { mockConfigService } from '@app/test/mocks';
import { mockConfig, mockResource } from '@app/test/data';

describe('ProfileImageComponent', () => {
  let component: ProfileImageComponent;
  let fixture: ComponentFixture<ProfileImageComponent>;
  let configSvc: ConfigService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileImageComponent],
      providers: [{ provide: ConfigService, useValue: mockConfigService }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('updateUI', () => {
    it('should return blank if no resource or resource has no path', () => {
      component['updateUI']();
      expect(component.htmlToBeRender).toBe('');
    });

    it('should return the html for a resource', () => {
      // mocking the TeamDynamix window
      global.TeamDynamix = {};

      configSvc = TestBed.get(ConfigService);
      configSvc.config.UserProfilePathBase = `${mockConfig.UserProfilePathBase}?fileName=`;
      component.resource = mockResource;
      component.imgClass = 'profile-image board picture';
      const test = `<div title="${mockResource.firstName} ${
        mockResource.lastName
      }" class="profile-image profile-image board picture undefined initials">${mockResource.firstName.slice(
        0,
        1,
      )}${mockResource.lastName.slice(0, 1)}</div>`;

      component['updateUI']();

      expect(component.htmlToBeRender).toBe(test);
    });
  });
});
