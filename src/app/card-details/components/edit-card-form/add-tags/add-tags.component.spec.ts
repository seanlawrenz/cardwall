import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { fake } from 'test-data-bot';
import { AddTagsComponent } from './add-tags.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { NO_ERRORS_SCHEMA } from '@angular/compiler/src/core';
import { SignalRService } from '@app/app-services';
import { of } from 'rxjs';

const formGroup = new FormGroup({
  tags: new FormControl(''),
});

const initMockTags = [
  fake(f => f.random.word()),
  fake(f => f.random.word()),
  fake(f => f.random.word()),
  fake(f => f.random.word()),
  fake(f => f.random.word()),
  fake(f => f.random.word()),
  fake(f => f.random.word()),
  fake(f => f.random.word()),
  fake(f => f.random.word()),
];

describe('AddTagsComponent', () => {
  let component: AddTagsComponent;
  let fixture: ComponentFixture<AddTagsComponent>;
  let signalR: SignalRService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddTagsComponent],
      imports: [FormsModule, NgSelectModule, ReactiveFormsModule],
      providers: [{ provide: SignalRService, useValue: { invoke: jest.fn() } }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTagsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    beforeEach(() => {
      component.cardForm = formGroup;
      signalR = TestBed.get(SignalRService);
    });
    it('should get possible tag suggestions', () => {
      signalR.invoke = jest.fn(() => of(initMockTags));
      const spy = jest.spyOn(signalR, 'invoke');
      fixture.detectChanges();

      expect(spy).toHaveBeenCalledWith('GetTagSuggestions', '');
    });
  });
});
