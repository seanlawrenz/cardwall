import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { ModalModule } from 'ngx-bootstrap/modal';

import { CardwallNavComponent } from './cardwall-nav.component';
import { mockBoard } from '@app/test/data';

describe('CardwallNavComponent', () => {
  let component: CardwallNavComponent;
  let fixture: ComponentFixture<CardwallNavComponent>;
  let spy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CardwallNavComponent],
      imports: [ModalModule.forRoot(), SharedModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardwallNavComponent);
    component = fixture.componentInstance;
    component.board = mockBoard;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should create the form', () => {
      fixture.detectChanges();

      expect(component.editBoardForm).toBeTruthy();
    });
  });

  describe('EditBoardName', () => {
    it('should emit the values of the edit board form', () => {
      fixture.detectChanges();
      spy = jest.spyOn(component.editBoardRequested, 'emit');
      component.editBoardForm.controls['name'].setValue('new name');
      component.editBoardForm.markAsDirty();
      const updatedBoard = { ...component.board, name: 'new name' };

      component.submitEditBoardName();

      expect(spy).toHaveBeenCalledWith(updatedBoard);
    });
  });
});
