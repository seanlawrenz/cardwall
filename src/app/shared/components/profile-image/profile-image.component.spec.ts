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

    // it('should return the html for a resource', () => {
    //   configSvc = TestBed.get(ConfigService);
    //   configSvc.config.UserProfilePathBase = `${mockConfig.UserProfilePathBase}?fileName=`;
    //   component.resource = mockResource;
    //   const profilePath = `${configSvc.config.UserProfilePathBase}${mockResource.profilePicturePath}`;
    //   const test = `<img src="${profilePath}" alt="${mockResource.firstName} ${mockResource.lastName} />`;

    //   component['updateUI']();

    //   expect(component.htmlToBeRender).toBe(test);
    // });
  });
});
