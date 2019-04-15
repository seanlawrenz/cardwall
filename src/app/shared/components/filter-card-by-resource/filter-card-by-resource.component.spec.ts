import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgSelectModule } from '@ng-select/ng-select';

import { FilterCardByResourceComponent } from './filter-card-by-resource.component';
import { ProfileImageComponent } from '../profile-image/profile-image.component';

describe('FilterCardByResourceComponent', () => {
  let component: FilterCardByResourceComponent;
  let fixture: ComponentFixture<FilterCardByResourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FilterCardByResourceComponent, ProfileImageComponent],
      imports: [NgSelectModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterCardByResourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
