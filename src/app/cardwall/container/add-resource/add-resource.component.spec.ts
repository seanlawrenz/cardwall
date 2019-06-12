import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from '@app/shared/shared.module';

import { AddResourceComponent } from './add-resource.component';
import { SignalRService } from '@app/app-services';
import { mockBoard } from '@app/test/data';

describe('AddResourceComponent', () => {
  let component: AddResourceComponent;
  let fixture: ComponentFixture<AddResourceComponent>;
  let signalR: SignalRService;
  let spy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddResourceComponent],
      imports: [FormsModule, NgSelectModule, ReactiveFormsModule, SharedModule],
      providers: [{ provide: SignalRService, useValue: { invoke: jest.fn(() => ({ pipe: jest.fn() })) } }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddResourceComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    beforeEach(() => (signalR = TestBed.get(SignalRService)));

    it('should call signalR invoke', () => {
      component.board = mockBoard;
      spy = jest.spyOn(signalR, 'invoke');
      fixture.detectChanges();

      expect(spy).toHaveBeenCalledWith('GetUsersAvailableForProject', '', mockBoard.projectId);
    });
  });
});
