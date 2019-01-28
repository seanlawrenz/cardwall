import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBoardDiagramComponent } from './add-board-diagram.component';
import { mockPlans } from '@app/test/data';

describe('AddBoardDiagramComponent', () => {
  let component: AddBoardDiagramComponent;
  let fixture: ComponentFixture<AddBoardDiagramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddBoardDiagramComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBoardDiagramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have plans', () => {
    component.planIdentifiers = mockPlans;
    expect(component.planIdentifiers).not.toBeUndefined();
  });
});
