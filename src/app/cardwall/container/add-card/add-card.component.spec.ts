import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@app/shared/shared.module';
import { AddCardComponent } from './add-card.component';
import { CardService } from '@app/app-services';

describe('AddCardComponent', () => {
  let component: AddCardComponent;
  let fixture: ComponentFixture<AddCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddCardComponent],
      imports: [FormsModule, ReactiveFormsModule, SharedModule],
      providers: [{ provide: CardService, useValue: { buildNewCard: jest.fn() } }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
