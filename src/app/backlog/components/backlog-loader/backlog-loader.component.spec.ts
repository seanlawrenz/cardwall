import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BacklogLoaderComponent } from './backlog-loader.component';
import { LoadingSpinnerComponent } from '@app/shared/components/loading-spinner/loading-spinner.component';

describe('BacklogLoaderComponent', () => {
  let component: BacklogLoaderComponent;
  let fixture: ComponentFixture<BacklogLoaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BacklogLoaderComponent, LoadingSpinnerComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BacklogLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
