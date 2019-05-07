import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/compiler/src/core';

import { AddAttachmentBaseComponent } from './add-attachment-base.component';
import { ConfigService } from '@app/app-services';
import { mockConfigService } from '@app/test/mocks';
import { mockCard } from '@app/test/data';

describe('AddAttachmentBaseComponent', () => {
  let component: AddAttachmentBaseComponent;
  let fixture: ComponentFixture<AddAttachmentBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddAttachmentBaseComponent],
      providers: [{ provide: ConfigService, useValue: mockConfigService }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAttachmentBaseComponent);
    component = fixture.componentInstance;
    component.card = mockCard;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
