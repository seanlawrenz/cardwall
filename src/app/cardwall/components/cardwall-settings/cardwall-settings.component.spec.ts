import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';

import { CardwallSettingsComponent } from './cardwall-settings.component';
import { SharedModule } from '@app/shared/shared.module';
import { ConfigService } from '@app/app-services';
import { mockConfigService } from '@app/test/mocks';
import { mockBoard } from '@app/test/data';

describe('CardwallSettingsComponent', () => {
  let component: CardwallSettingsComponent;
  let fixture: ComponentFixture<CardwallSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CardwallSettingsComponent],
      imports: [FormsModule, ModalModule, SharedModule],
      providers: [{ provide: ConfigService, useValue: mockConfigService }, BsModalService],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardwallSettingsComponent);
    component = fixture.componentInstance;
    component.board = mockBoard;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
