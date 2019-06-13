import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedToolbarComponent } from './feed-toolbar.component';
import { ConfigService } from '@app/app-services';
import { mockConfigService } from '@app/test/mocks';
import { mockBoard } from '@app/test/data';

describe('FeedToolbarComponent', () => {
  let component: FeedToolbarComponent;
  let fixture: ComponentFixture<FeedToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FeedToolbarComponent],
      providers: [{ provide: ConfigService, useValue: mockConfigService }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedToolbarComponent);
    component = fixture.componentInstance;
    component.board = mockBoard;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
