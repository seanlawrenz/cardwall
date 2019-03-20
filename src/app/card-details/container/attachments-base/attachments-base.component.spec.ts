import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttachmentsBaseComponent } from './attachments-base.component';

describe('AttachmentsBaseComponent', () => {
  let component: AttachmentsBaseComponent;
  let fixture: ComponentFixture<AttachmentsBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttachmentsBaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttachmentsBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
