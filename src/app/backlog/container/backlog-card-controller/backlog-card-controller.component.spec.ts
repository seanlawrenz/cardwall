import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SortablejsModule } from 'angular-sortablejs';

import { BacklogCardControllerComponent } from './backlog-card-controller.component';
import { BacklogCardComponent } from '@app/backlog/components/backlog-container/backlog-card/backlog-card.component';
import { mockCard } from '@app/test/data';

describe('BacklogCardControllerComponent', () => {
  let component: BacklogCardControllerComponent;
  let fixture: ComponentFixture<BacklogCardControllerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BacklogCardControllerComponent, BacklogCardComponent],
      imports: [SortablejsModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BacklogCardControllerComponent);
    component = fixture.componentInstance;
    component.cards = [mockCard];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
