import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';

import { RemoveBoardComponent } from './remove-board.component';

describe('RemoveBoardComponent', () => {
  let component: RemoveBoardComponent;
  let fixture: ComponentFixture<RemoveBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RemoveBoardComponent],
      imports: [RouterTestingModule],
      providers: [{ provide: Store, useValue: { dispatch: jest.fn() } }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
