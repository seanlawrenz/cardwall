import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';

import { CardDetailsDialogComponent } from './card-details-dialog.component';

describe('CardDetailsDialogComponent', () => {
  let component: CardDetailsDialogComponent;
  let fixture: ComponentFixture<CardDetailsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CardDetailsDialogComponent],
      imports: [ModalModule],
      providers: [{ provide: BsModalService, useValue: { show: jest.fn() } }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
