import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { PopoverModule } from 'ngx-bootstrap/popover';

import { CardwallListComponent } from './cardwall-list.component';
import { mockList, mockBoard } from '@app/test/data';
import { ConfigService } from '@app/app-services';
import { mockConfigService } from '@app/test/mocks';

describe('CardwallListComponent', () => {
  let component: CardwallListComponent;
  let fixture: ComponentFixture<CardwallListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CardwallListComponent],
      imports: [PopoverModule],
      providers: [{ provide: ConfigService, useValue: mockConfigService }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardwallListComponent);
    component = fixture.componentInstance;
    component.list = mockList;
    component.board = mockBoard;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
