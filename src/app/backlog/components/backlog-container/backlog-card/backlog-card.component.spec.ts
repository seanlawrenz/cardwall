import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BacklogCardComponent } from './backlog-card.component';
import { GripComponent } from '@app/shared/components/grip/grip.component';
import { mockCard } from '@app/test/data';

describe('BacklogCardComponent', () => {
  let component: BacklogCardComponent;
  let fixture: ComponentFixture<BacklogCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BacklogCardComponent, GripComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BacklogCardComponent);
    component = fixture.componentInstance;
    component.card = mockCard;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
