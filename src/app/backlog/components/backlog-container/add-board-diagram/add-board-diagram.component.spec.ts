import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBoardDiagramComponent } from './add-board-diagram.component';
import { mockPlans } from '@app/test/data';
import { ModalModule } from 'ngx-bootstrap/modal';

describe('AddBoardDiagramComponent', () => {
  let component: AddBoardDiagramComponent;
  let fixture: ComponentFixture<AddBoardDiagramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddBoardDiagramComponent],
      imports: [ModalModule.forRoot()],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBoardDiagramComponent);
    component = fixture.componentInstance;
    component.planIdentifiers = mockPlans;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have plans', () => {
    expect(component.planIdentifiers).not.toBeUndefined();
  });

  describe('adding or removing card walls', () => {
    it('should update isSelected', () => {
      component.updateSelectedPlans(component.plansToDisplay[0]);
      expect(component.plansToDisplay[0].isSelected).toBeTruthy();
      component.updateSelectedPlans(component.plansToDisplay[0]);
      expect(component.plansToDisplay[0].isSelected).toBeFalsy();
    });

    it('should send the plans to be added', () => {
      component.updateSelectedPlans(component.plansToDisplay[0]);
      component.updateSelectedPlans(component.plansToDisplay[2]);

      component.addCardwallsToBacklog();

      async(() => {
        expect(component.selectedPlans).toEqual([mockPlans[0], mockPlans[2]]);
      });
    });
  });
});
