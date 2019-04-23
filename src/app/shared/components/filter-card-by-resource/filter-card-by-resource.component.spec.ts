import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgSelectModule } from '@ng-select/ng-select';

import { FilterCardByResourceComponent } from './filter-card-by-resource.component';
import { ProfileImageComponent } from '../profile-image/profile-image.component';

import { ConfigService } from '@app/app-services';
import { mockConfigService } from '@app/test/mocks';

describe('FilterCardByResourceComponent', () => {
  let component: FilterCardByResourceComponent;
  let fixture: ComponentFixture<FilterCardByResourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FilterCardByResourceComponent, ProfileImageComponent],
      imports: [NgSelectModule],
      providers: [{ provide: ConfigService, useValue: mockConfigService }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterCardByResourceComponent);
    component = fixture.componentInstance;
    component.resources = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
