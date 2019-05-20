import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { ModalModule } from 'ngx-bootstrap/modal';

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
      imports: [ModalModule.forRoot(), PopoverModule],
      providers: [{ provide: ConfigService, useValue: mockConfigService }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardwallListComponent);
    component = fixture.componentInstance;
    component.list = mockList;
    component.board = mockBoard;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a form', () => {
    fixture.detectChanges();

    expect(component.editListForm).toBeTruthy();

    expect(component.editListForm.controls['wipMin'].value).toBeNull();
  });

  it('should create a form with a wip if one', () => {
    component.list = { ...mockList, limits: [{ minValue: 3 }] };
    fixture.detectChanges();

    expect(component.editListForm).toBeTruthy();

    expect(component.editListForm.controls['wipMin'].value).toEqual(3);
  });

  describe('wipValidation', () => {
    beforeEach(() => fixture.detectChanges());

    it('should not allow a min greater than the max', () => {
      component.editListForm.controls['wipMin'].setValue(5);
      component.editListForm.controls['wipMax'].setValue(4);

      expect(component.editListForm.valid).toBeFalsy();
    });

    it('should only allow whole numbers', () => {
      component.editListForm.controls['wipMin'].setValue(5.4);
      component.editListForm.controls['wipMax'].setValue(6.8);

      expect(component.editListForm.valid).toBeFalsy();
    });

    it('should only allow positive numbers', () => {
      component.editListForm.controls['wipMin'].setValue(-15);

      expect(component.editListForm.valid).toBeFalsy();
    });
  });
});
