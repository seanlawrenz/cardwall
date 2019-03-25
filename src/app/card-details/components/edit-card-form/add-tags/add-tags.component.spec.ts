import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { fake } from 'test-data-bot';
import { AddTagsComponent } from './add-tags.component';
import { TagService } from './tag-service/tag.service';
import { of } from 'rxjs';
import { NgSelectModule } from '@ng-select/ng-select';

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
  let tagSvc: TagService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddTagsComponent],
      imports: [FormsModule, NgSelectModule, ReactiveFormsModule],
      providers: [{ provide: TagService, useValue: { getTagSuggestions: jest.fn(() => {}) } }],
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
      tagSvc = TestBed.get(TagService);
    });
    it('should get possible tag suggestions', () => {
      tagSvc.getTagSuggestions = jest.fn(() => of(initMockTags));
      const spy = jest.spyOn(tagSvc, 'getTagSuggestions');
      fixture.detectChanges();

      expect(spy).toHaveBeenCalledWith('');
    });
  });
});
