import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';

import { CreateListComponent } from './create-list.component';
import { SharedModule } from '@app/shared/shared.module';
import { mockBoard, mockList } from '@app/test/data';

describe('CreateListComponent', () => {
  let component: CreateListComponent;
  let fixture: ComponentFixture<CreateListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateListComponent],
      imports: [FormsModule, ModalModule, ReactiveFormsModule, SharedModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateListComponent);
    component = fixture.componentInstance;
    mockBoard.lists = [mockList];
    component.board = mockBoard;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
