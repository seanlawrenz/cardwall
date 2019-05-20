import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SortablejsModule } from 'angular-sortablejs';

import { CardwallListsViewComponent } from './cardwall-lists-view.component';
import { mockBoard, mockList } from '@app/test/data';
import { ConfigService } from '@app/app-services';
import { mockConfigService } from '@app/test/mocks';

describe('CardwallListsViewComponent', () => {
  let component: CardwallListsViewComponent;
  let fixture: ComponentFixture<CardwallListsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CardwallListsViewComponent],
      imports: [SortablejsModule],
      providers: [{ provide: ConfigService, useValue: mockConfigService }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardwallListsViewComponent);
    component = fixture.componentInstance;
    component.board = mockBoard;
    component.lists = [mockList];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
